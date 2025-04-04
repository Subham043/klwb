<?php

namespace App\Modules\PaymentOfficer\Contribution\Services;

use App\Modules\Admins\Industries\Models\Industry;
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

class NonContributionService
{

	protected function model(): Builder
	{
		$year = request()->query('filter')['year'] ?? null;
		return Industry::isActive()
		->withCount([
			'payments as non_contributions_payments_pending_count' => function ($query) use ($year) {
				$query->where('status', '!=', PaymentStatus::Success->value)->where('status', PaymentStatus::Pending->value);
				if($year) {
					$query->where('year', $year);
				}
			},
			'payments as non_contributions_payments_failed_count' => function ($query) use ($year) {
				$query->where('status', '!=', PaymentStatus::Success->value)->where('status', PaymentStatus::Fail->value);
				if($year) {
					$query->where('year', $year);
				}
			}
		])
		->where(function ($query) use ($year) {
			$query->doesntHave('payments')
				->orWhere(function ($qry) use ($year) {
					$qry->whereHas('payments', function ($q) use ($year) {
						$q->where('status', '!=', PaymentStatus::Success->value);
						if($year) {
							$q->where('year', $year);
						}
					});
				});
		});
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-id')
			->allowedSorts('id')
			->allowedFilters([
				AllowedFilter::custom('search', new CommonFilter, null, false),
				AllowedFilter::callback('year', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->doesntHave('payments')
							->orWhere(function ($qry) use ($value) {
								$qry->whereHas('payments', function ($q) use ($value) {
									$q->where('year', $value);
								});
							});
					});
				}),
				AllowedFilter::callback('status', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						if ($value == "registered") {
							$query->whereHas('auth');
						} elseif ($value == "non_registered") {
							$query->doesntHave('auth');
						}
					});
				}),
			]);
	}

	public function getExcelQuery(): QueryBuilder
	{
		return $this->query();
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
		$writer = SimpleExcelWriter::streamDownload('non-contributions.xlsx');

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
														'Reg ID.' => $data->reg_id,
														'Name' => $data->name,
														'Act' => Act::getValue($data->act) ?? '',
														'Category' => $data->category ?? '',
														'Pincode' => $data->pincode,
														'Active' => $data->is_active ? 'Yes' : 'No',
														'Created At' => $data->created_at->format('Y-m-d H:i:s'),
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
			$q->where('name', 'LIKE', '%' . $value . '%')
			->orWhere('act', 'LIKE', '%' . $value . '%')
			->orWhere('category', 'LIKE', '%' . $value . '%')
			->orWhere('pincode', 'LIKE', '%' . $value . '%')
			->orWhere('reg_id', 'LIKE', '%' . $value . '%');
		});
	}
}
