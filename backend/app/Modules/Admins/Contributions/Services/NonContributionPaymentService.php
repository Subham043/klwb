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

class NonContributionPaymentService
{

	protected function model($comp_regd_id): Builder
	{
		return Payment::with([
			'industry' => function ($query) {
				$query->with([
					'auth' => function ($query) {
						$query->with(['city', 'taluq']);
					}
				]);
			},
		])
		->where('comp_regd_id', $comp_regd_id)
		->whereHas('industry', function ($query) use ($comp_regd_id) {
			$query->where('id', $comp_regd_id);
		})
		->where('status', '!=', PaymentStatus::Success->value);
	}
	protected function query($comp_regd_id): QueryBuilder
	{
		return QueryBuilder::for($this->model($comp_regd_id))
			->defaultSort('-id')
			->allowedSorts('id', 'year')
			->allowedFilters([
				'year',
				AllowedFilter::custom('search', new CommonFilter, null, false),
			]);
	}

	public function getExcelQuery($comp_regd_id): QueryBuilder
	{
		return $this->query($comp_regd_id);
	}

	public function getLatestByYear($comp_regd_id): Payment
	{
		return $this->model($comp_regd_id)->orderBy('year', 'desc')
			->firstOrFail();
	}

	public function getById(string $id, $comp_regd_id): Payment
	{
		return $this->model($comp_regd_id)
			->where('id', $id)
			->latest('id')
			->firstOrFail();
	}

	public function getPaymentCompletedById(string $id, $comp_regd_id): Payment
	{
		return $this->model($comp_regd_id)
			->where('id', $id)
			->where('status', 1)
			->latest('id')
			->firstOrFail();
	}

	public function getList($comp_regd_id, Int $total = 10): LengthAwarePaginator
	{
		return $this->query($comp_regd_id)->paginate($total)
			->appends(request()->query());
	}

	public function excel(): SimpleExcelWriter
	{
		set_time_limit(0); // Removes the time limit
		
		$page = 1;
		$perPage = 1000; // Number of items per page
		$writer = SimpleExcelWriter::streamDownload('contributions.xlsx');

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
