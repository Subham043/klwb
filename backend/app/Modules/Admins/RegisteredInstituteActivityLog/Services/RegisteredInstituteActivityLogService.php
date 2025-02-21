<?php

namespace App\Modules\Admins\RegisteredInstituteActivityLog\Services;

use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Activitylog\Models\Activity;

class RegisteredInstituteActivityLogService
{

	protected function model(string $reg_institute_id): Builder
	{
		return Activity::with([
			'causer' => function ($q) {
				$q->with('roles');
			}
		])
		->whereHas('causer', function ($qr) {
			$qr->whereHas('roles', function ($q) {
				$q->whereIn('name', ['Super-Admin', 'Admin', 'Institute']);
			});
		})
		->where('log_name', 'institute_'.$reg_institute_id);
	}
	protected function query(string $reg_institute_id): QueryBuilder
	{
		return QueryBuilder::for($this->model($reg_institute_id))
			->defaultSort('-id')
			->allowedSorts('id');
	}

	public function getExcelQuery(string $reg_institute_id): QueryBuilder
	{
		return $this->query($reg_institute_id);
	}

	public function getList(Int $total = 10, string $reg_institute_id): LengthAwarePaginator
	{
		return $this->query($reg_institute_id)->paginate($total)
			->appends(request()->query());
	}

	public function getById(string $reg_institute_id, string $id): Activity
	{
		return $this->model($reg_institute_id)->findOrFail($id);
	}
}
