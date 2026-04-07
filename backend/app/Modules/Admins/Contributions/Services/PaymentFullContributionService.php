<?php

namespace App\Modules\Admins\Contributions\Services;

use App\Modules\IndustryManagement\Payment\Models\Payment;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class PaymentFullContributionService
{

	protected function model(): Builder
	{
		return Payment::query()
			->selectRaw("
                payments.comp_regd_id,
																payments.year,
																payments.pay_id,
																payments.price,
																payments.male,
																payments.female,
																payments.interest,
																payments.status,
																payments.resolved,
																payments.transaction_status,
																payments.atrn,
																payments.interest_paid,
																payments.employee_excel,
																payments.payed_on,
																payments.is_edited,
																payments.created_at,
																payments.updated_at,
																registered_industries.name as industry_name,
																registered_industries.is_active as industry_is_active,
																registered_industries.id as industry_id
            ")
			->leftJoin('registered_industries', 'payments.comp_regd_id', '=', 'registered_industries.id');
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-year')
			->allowedSorts('id', 'year')
			->allowedFilters([
				'year',
				'status',
				AllowedFilter::custom('search', new CommonFilter, null, false),
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
}


class CommonFilter implements Filter
{
	public function __invoke(Builder $query, $value, string $property)
	{
		$query->where(function ($q) use ($value) {
			$q->where('payments.year', 'LIKE', '%' . $value . '%')
				->orWhere('payments.pay_id', 'LIKE', '%' . $value . '%')
				->orWhere('payments.male', 'LIKE', '%' . $value . '%')
				->orWhere('payments.female', 'LIKE', '%' . $value . '%')
				->orWhere('payments.price', 'LIKE', '%' . $value . '%')
				->orWhere('registered_industries.name', 'LIKE', '%' . $value . '%');
		});
	}
}
