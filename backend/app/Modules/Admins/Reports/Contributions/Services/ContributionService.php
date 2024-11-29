<?php

namespace App\Modules\Admins\Reports\Contributions\Services;

use App\Modules\IndustryManagement\Payment\Models\Payment;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\LengthAwarePaginator;

class ContributionService
{

	protected function model(): Builder
	{
		return Payment::query()
		->selectRaw("payments.year as year, 
			SUM(CASE WHEN payments.status = 1 THEN 1 ELSE 0 END) as total_countributions,
			SUM(CASE WHEN payments.status = 1 THEN payments.price ELSE 0 END) as total_countribution_amount,
			SUM(CASE WHEN payments.status = 1 THEN payments.male ELSE 0 END) as male_count,
			SUM(CASE WHEN payments.status = 1 THEN payments.female ELSE 0 END) as female_count")
		->join('registered_industries', 'registered_industries.id', '=', 'payments.comp_regd_id')
		->join('industry_auths', 'industry_auths.reg_industry_id', '=', 'registered_industries.id')
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
					$query->where('registered_industries.city_id', $value);
				}),
				AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
					$query->where('registered_industries.taluq_id', $value);
				}),
				AllowedFilter::callback('from_date', function (Builder $query, $value) {
					$query->where('payments.payed_on', '>=', $value);
				}),
				AllowedFilter::callback('to_date', function (Builder $query, $value) {
					$query->where('payments.payed_on', '<=', $value);
				}),
			]);
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
	}

	public function excel(): SimpleExcelWriter
	{
		$model = $this->query();
		$i = 0;
		$writer = SimpleExcelWriter::streamDownload('contributions_report.xlsx');
		foreach ($model->lazy(1000)->collect() as $data) {
			$writer->addRow([
				'Year' => $data->year,
				'Male Count' => $data->male_count,
				'Female Count' => $data->female_count,
				'Total Contribution Count' => $data->total_countributions,
				'Total Contribution Amount' => $data->total_countribution_amount,
			]);
			if ($i == 1000) {
				flush();
			}
			$i++;
		}
		return $writer;
	}
}
