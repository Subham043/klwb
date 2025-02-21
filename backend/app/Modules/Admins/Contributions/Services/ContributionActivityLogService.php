<?php

namespace App\Modules\Admins\Contributions\Services;

use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Activitylog\Models\Activity;

class ContributionActivityLogService
{

	protected function model(string $payment_id): Builder
	{
		return Activity::with([
			'causer' => function ($q) {
				$q->with('roles');
			},
		])
		->whereHas('causer', function ($qr) {
			$qr->whereHas('roles', function ($q) {
				$q->whereIn('name', ['Super-Admin', 'Admin']);
			});
		})
		->where('log_name', 'payment_'.$payment_id);
	}
	protected function query(string $payment_id): QueryBuilder
	{
		return QueryBuilder::for($this->model($payment_id))
			->defaultSort('-id')
			->allowedSorts('id');
	}

	public function getExcelQuery(string $payment_id): QueryBuilder
	{
		return $this->query($payment_id);
	}

	public function getList(Int $total = 10, string $payment_id): LengthAwarePaginator
	{
		return $this->query($payment_id)->paginate($total)
			->appends(request()->query());
	}

	public function getById(string $payment_id, string $id): Activity
	{
		return $this->model($payment_id)->findOrFail($id);
	}
}
