<?php

namespace App\Modules\InstituteManagement\Scholarship\Services;

use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Models\Application;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class InstituteScholarshipService
{

	protected function model(): Builder
	{
		return Application::commonWith()
		->commonRelation()
		->belongsToAuthSchool()
		->whereApplicationStageGreaterThan(ApplicationState::None);
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-id')
			->allowedSorts('id', 'year')
			->allowedFilters([
				'application_year',
				AllowedFilter::custom('search', new CommonFilter, null, false),
				AllowedFilter::callback('status', function (Builder $query, $value) {
					if($value == 'approved'){
						$query->where(function($qry){
							$qry->where(function($q){
								$q->isApplicationApproved()->inSchoolStage();
							})->orWhere(function($q){
								$q->whereApplicationStageGreaterThan(ApplicationState::School);
							});
						});
					}
					if($value == 'rejected'){
						$query->isApplicationRejected()->inSchoolStage();
					}
					if($value == 'pending'){
						$query->isApplicationPending()->inSchoolStage();
					}
				}),
			]);
	}

	public function getLatest(): Application|null
	{
		return $this->model()
			->latest()
			->first();
	}

	public function getById(string $id): Application|null
	{
		return $this->model()
			->where('id', $id)
			->latest()
			->first();
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
	}

	public function getTotalApplicationCount(): int
	{
		return Application::belongsToAuthSchool()
		->whereApplicationStageGreaterThan(ApplicationState::None)
		->count();
	}

	public function getTotalApprovedApplicationCount(): int
	{
		return Application::belongsToAuthSchool()->where(function($qry){
			$qry->where(function($q){
				$q->inSchoolStage()->isApplicationApproved();
			})->orWhere(function($q){
				$q->whereApplicationStageGreaterThan(ApplicationState::School);
			});
		})->count();
	}

	public function getTotalRejectedApplicationCount(): int
	{
		return Application::belongsToAuthSchool()->where(function($qry){
			$qry->inSchoolStage()->isApplicationRejected();
		})->count();
	}

	public function getTotalPendingApplicationCount(): int
	{
		return Application::belongsToAuthSchool()->where(function($qry){
			$qry->inSchoolStage()->isApplicationPending();
		})->count();
	}

}


class CommonFilter implements Filter
{
	public function __invoke(Builder $query, $value, string $property)
	{
		$query->where(function ($q) use ($value) {
			$q->where('amount', 'LIKE', '%' . $value . '%')
				->orWhere('year', 'LIKE', '%' . $value . '%');
		});
	}
}
