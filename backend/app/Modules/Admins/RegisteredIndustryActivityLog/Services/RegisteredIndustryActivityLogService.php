<?php

namespace App\Modules\Admins\RegisteredIndustryActivityLog\Services;

use App\Modules\IndustryManagement\Payment\Models\Payment;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Activitylog\Models\Activity;

class RegisteredIndustryActivityLogService
{

	protected function model(string $reg_industry_id): Builder
	{
		return Activity::with([
			'causer' => function ($q) {
				$q->with('roles');
			}
		])
		->whereHas('causer.roles', function ($q) {
			$q->whereIn('name', ['Super-Admin', 'Admin', 'Industry']);
		})
		->where('log_name', 'industry_'.$reg_industry_id);
	}
	protected function query(string $reg_industry_id): QueryBuilder
	{
		return QueryBuilder::for($this->model($reg_industry_id))
			->defaultSort('-id')
			->allowedSorts('id');
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
}
