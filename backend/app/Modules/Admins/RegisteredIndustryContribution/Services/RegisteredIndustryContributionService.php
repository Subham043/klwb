<?php

namespace App\Modules\Admins\RegisteredIndustryContribution\Services;

use App\Modules\Admins\RequestIndustry\Enums\Act;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class RegisteredIndustryContributionService
{

	protected function model(string $reg_industry_id): Builder
	{
		return Payment::with([
			'industry' => function ($query) {
				$query->with(['city', 'taluq']);
			}
		])->whereHas('industry', function ($query) {
			$query->whereHas('city')->whereHas('taluq');
		})->where('comp_regd_id', $reg_industry_id);
	}
	protected function query(string $reg_industry_id): QueryBuilder
	{
		return QueryBuilder::for($this->model($reg_industry_id))
			->defaultSort('-year')
			->allowedSorts('id', 'year')
			->allowedFilters([
				'year',
				AllowedFilter::custom('search', new CommonFilter, null, false),
				AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
					$query->whereHas('industry', function ($qry) use ($value) {
						$qry->where('taluq_id', $value);
					});
				}),
				AllowedFilter::callback('has_city', function (Builder $query, $value) {
					$query->whereHas('industry', function ($qry) use ($value) {
						$qry->where('city_id', $value);
					});
				}),
				AllowedFilter::callback('from_date', function (Builder $query, $value) {
					$query->where('payed_on', '>=', $value);
				}),
				AllowedFilter::callback('to_date', function (Builder $query, $value) {
					$query->where('payed_on', '<=', $value);
				}),
			]);
	}

	public function getExcelQuery(string $reg_industry_id): QueryBuilder
	{
		return $this->query($reg_industry_id);
	}

	public function getList(Int $total = 10, string $reg_industry_id): LengthAwarePaginator
	{
		return $this->query($reg_industry_id)->paginate($total)
			->appends(request()->query());
	}

	public function getById(string $reg_industry_id, string $id): Payment
	{
		return $this->model($reg_industry_id)->findOrFail($id);
	}

	public function excel(string $reg_industry_id): SimpleExcelWriter
	{
		set_time_limit(0); // Removes the time limit

		$page = 1;
		$perPage = 1000; // Number of items per page
		$writer = SimpleExcelWriter::streamDownload('registered_industry_contributions.xlsx');

		do {
						// Set the current page for pagination
						Paginator::currentPageResolver(function () use ($page) {
										return $page;
						});

						// Retrieve the paginated data
						$paginator = $this->getList($perPage, $reg_industry_id);
						$items = $paginator->items();

						// Write each item to the Excel file
						foreach ($items as $data) {
										$writer->addRow([
														'Id' => $data->id,
														'Industry' => $data->industry->name ?? '',
														'Act' => Act::getValue($data->industry->act) ?? '',
														'Category' => $data->industry->category ?? '',
														'District' => $data->industry->city->name ?? '',
														'Taluq' => $data->industry->taluq->name ?? '',
														'Year' => $data->year,
														'Pay ID' => $data->pay_id,
														'Price' => $data->price,
														'Male Count' => $data->male,
														'Female Count' => $data->female,
														'Total Count' => $data->female + $data->male,
														'Interest' => $data->interest,
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
