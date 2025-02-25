<?php

namespace App\Modules\Admins\Reports\Contributions\Services;

use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;

class ContributionComparisonService
{

	protected function model(): Builder
	{
		$selectedYear = request()->query('filter')['year'] ?? now()->subYear()->format('Y');
		$previousYear = $selectedYear	- 1;
		return Payment::query()
		->selectRaw("
						registered_industries.id AS registered_industries_id,
						registered_industries.name AS registered_industries_name,
						registered_industries.category AS registered_industries_category,
						registered_industries.act AS registered_industries_act,
						registered_industries.is_active AS registered_industries_is_active,
						registered_industries.created_at AS registered_industries_created_at,
						registered_industries.updated_at AS registered_industries_updated_at,
						NULLIF(SUM(CASE WHEN payments.year = ? THEN payments.price END), 0) AS price_selected_year,
						GROUP_CONCAT(CASE WHEN payments.year = ? THEN payments.pay_id END) AS pay_id_selected_year,
						? AS selected_year,
						NULLIF(SUM(CASE WHEN payments.year = ? THEN payments.price END), 0) AS price_previous_selected_year,
						GROUP_CONCAT(CASE WHEN payments.year = ? THEN payments.pay_id END) AS pay_id_previous_year,
						? AS previous_selected_year
		", [$selectedYear, $selectedYear, $selectedYear, $previousYear, $previousYear, $previousYear])
		->whereIn('payments.year', [$selectedYear, $previousYear])
		->join('registered_industries', 'registered_industries.id', '=', 'payments.comp_regd_id')
		->join('industry_auths', 'industry_auths.reg_industry_id', '=', 'registered_industries.id')
		->whereNull('industry_auths.created_by')
		->where('payments.status', PaymentStatus::Success->value)
		->groupBy(DB::raw('payments.comp_regd_id'));
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->allowedFilters([
				AllowedFilter::callback('year', function (Builder $query, $value) {}),
			]);
	}

	public function getExcelQuery(): QueryBuilder
	{
		return $this->query()->orderByRaw('NULL');
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
	}
}
