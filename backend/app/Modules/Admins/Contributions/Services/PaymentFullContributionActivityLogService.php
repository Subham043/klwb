<?php

namespace App\Modules\Admins\Contributions\Services;

use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Activitylog\Models\Activity;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\Filters\Filter;

class PaymentFullContributionActivityLogService
{

	protected function model(): Builder
	{
		return Activity::with([
			'causer' => function ($q) {
				$q->with('roles');
			},
		])
			->select(
				'activity_log.*',
				'payments.id as payment_id',
				'payments.year',
				'payments.comp_regd_id',
				'payments.pay_id',
				'payments.price',
				'payments.male',
				'payments.female',
				'payments.interest',
				'payments.status',
				'payments.payed_on',
				'registered_industries.name as industry_name',
				'registered_industries.id as industry_id',
				'registered_industries.is_active as industry_is_active'
			)
			->leftJoin('payments', 'payments.id', '=', 'activity_log.subject_id')
			->leftJoin('registered_industries', 'payments.comp_regd_id', '=', 'registered_industries.id')
			->where('activity_log.log_name', 'like', '%payment_%');
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-activity_log.id')
			->allowedSorts('activity_log.id')
			->allowedFilters([
				'payments.year',
				'payments.status',
				AllowedFilter::custom('search', new CommonFilter, null, false),
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

	public function getById(string $id): Activity
	{
		return $this->model()->findOrFail($id);
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