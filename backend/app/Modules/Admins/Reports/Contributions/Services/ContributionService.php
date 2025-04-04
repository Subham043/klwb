<?php

namespace App\Modules\Admins\Reports\Contributions\Services;

use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;

class ContributionService
{

	protected function model(): Builder
	{
		return Payment::query()
		->selectRaw("payments.year as year, 
			COUNT(DISTINCT payments.id) as total_countributions,
			SUM(payments.price) as total_countribution_amount,
			SUM(payments.male) as male_count,
			SUM(payments.female) as female_count")
		->join('registered_industries', 'registered_industries.id', '=', 'payments.comp_regd_id')
		->Join('industry_auths', 'industry_auths.reg_industry_id', '=', 'registered_industries.id')
		->whereNull('industry_auths.created_by')
		->where('payments.status', PaymentStatus::Success->value)
		->groupBy(DB::raw('payments.year'));
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-year')
			->allowedSorts('year')
			->allowedFilters([
				'year',
				AllowedFilter::callback('has_city', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->where('industry_auths.city_id', $value);
					});
				}),
				AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->where('industry_auths.taluq_id', $value);
					});
				}),
				AllowedFilter::callback('from_date', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereDate('payments.payed_on', '>=', $value);
					});
				}),
				AllowedFilter::callback('to_date', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereDate('payments.payed_on', '<=', $value);
					});
				}),
			]);
	}

	public function getExcelQuery(): QueryBuilder
	{
		return $this->query();
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
		$writer = SimpleExcelWriter::streamDownload('contributions_report.xlsx');

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
					'Year' => $data->year,
					'Male Count' => $data->male_count,
					'Female Count' => $data->female_count,
					'Total Contribution Count' => $data->total_countributions,
					'Total Contribution Amount' => $data->total_countribution_amount,
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
