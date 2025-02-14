<?php

namespace App\Modules\Admins\StudentActivityLog\Services;

use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\Activitylog\Models\Activity;

class StudentActivityLogService
{

	protected function model(string $user_id): Builder
	{
		return Activity::with([
			'causer' => function ($q) {
				$q->with('roles');
			}
		])
		->whereHas('causer', function ($qr) {
			$qr->whereHas('roles', function ($q) {
				$q->whereIn('name', ['Super-Admin', 'Admin', 'Student']);
			});
		})
		->where('log_name', 'student_'.$user_id);
	}
	protected function query(string $user_id): QueryBuilder
	{
		return QueryBuilder::for($this->model($user_id))
			->defaultSort('-id')
			->allowedSorts('id');
	}

	public function getList(Int $total = 10, string $user_id): LengthAwarePaginator
	{
		return $this->query($user_id)->paginate($total)
			->appends(request()->query());
	}

	public function getById(string $user_id, string $id): Activity
	{
		return $this->model($user_id)->findOrFail($id);
	}
}
