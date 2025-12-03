<?php

namespace App\Modules\Admins\Contributions\Services;

use App\Modules\Admins\RequestIndustry\Enums\Act;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;
use Illuminate\Pagination\Paginator;

class AttemptedContributionService
{

	protected function model(): Builder
	{
		return Payment::with([
			'industry' => function ($query) {
				$query->with([
					'auth' => function ($query) {
						$query->with(['city', 'taluq'])->whereNull('created_by');
					}
				]);
			},
		])->whereHas('industry')->where('status', '!=', PaymentStatus::Success->value);
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-id')
			->allowedSorts('id', 'year')
			->allowedFilters([
				'year',
				AllowedFilter::custom('search', new CommonFilter, null, false),
				AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereHas('industry', function ($qry) use ($value) {
							$qry->whereHas('auth', function ($q) use ($value) { $q->where('taluq_id', $value)->whereNull('created_by'); });
						});
					});
				}),
				AllowedFilter::callback('has_city', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereHas('industry', function ($qry) use ($value) {
							$qry->whereHas('auth', function ($q) use ($value) { $q->where('city_id', $value)->whereNull('created_by'); });
						});
					});
				}),
				AllowedFilter::callback('from_date', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereDate('payed_on', '>=', $value);
					});
				}),
				AllowedFilter::callback('to_date', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereDate('payed_on', '<=', $value);
					});
				}),
			]);
	}

	public function getExcelQuery(): QueryBuilder
	{
		return $this->query();
	}

	public function getLatestByYear(): Payment
	{
		return $this->model()->orderBy('year', 'desc')
			->firstOrFail();
	}

	public function getById(string $id): Payment
	{
		return $this->model()
			->where('id', $id)
			->latest('id')
			->firstOrFail();
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
	}

	public function excel(): SimpleExcelWriter
	{
		set_time_limit(0); // Removes the time limit
		
		$page = 1;
		$perPage = 1000; // Number of items per page
		$writer = SimpleExcelWriter::streamDownload('attempted_contributions.xlsx');

		do {
						// Set the current page for pagination
						Paginator::currentPageResolver(function () use ($page) {
										return $page;
						});

						// Retrieve the paginated data
						$paginator = $this->getList($perPage);
						$items = $paginator->items();

						// Write each item to the Excel file
						foreach ($items as $data) {
										$writer->addRow([
														'Id' => $data->id,
														'Industry' => $data->industry->name ?? '',
														'Act' => Act::getValue($data->industry->act) ?? '',
														'Category' => $data->industry->category ?? '',
														'District' => $data->industry->auth->city->name ?? '',
														'Taluq' => $data->industry->auth->taluq->name ?? '',
														'Year' => $data->year,
														'Pay ID' => $data->pay_id,
														'Price' => $data->price,
														'Male Count' => $data->male,
														'Female Count' => $data->female,
														'Total Count' => $data->female + $data->male,
														'Interest' => $data->interest ?? '0',
														'Status' => PaymentStatus::getValue($data->status),
														'Payed On' => $data->payed_on->format('Y-m-d'),
										]);
						}

						// Move to the next page
						$page++;
						flush();
		} while ($page <= $paginator->lastPage());

		// Close the writer and return the download response
		$writer->close();

		return $writer;
	}
}


class CommonFilter implements Filter
{
	public function __invoke(Builder $query, $value, string $property)
	{
		$query->where(function ($q) use ($value) {
			$q->where('year', 'LIKE', '%' . $value . '%')
				->orWhere('pay_id', 'LIKE', '%' . $value . '%')
				->orWhere('price', 'LIKE', '%' . $value . '%')
				->orWhereHas('industry', function ($q) use ($value) {
					$q->where('name', 'LIKE', '%' . $value . '%')
						->orWhere('act', 'LIKE', '%' . $value . '%')
						->orWhere('category', 'LIKE', '%' . $value . '%');
				});
		});
	}
}
