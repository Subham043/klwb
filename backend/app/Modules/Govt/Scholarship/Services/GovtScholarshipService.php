<?php

namespace App\Modules\Govt\Scholarship\Services;

use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Models\Application;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class GovtScholarshipService
{

	protected function model(): Builder
	{
		return Application::commonWith()
		->commonRelation()
		->whereApplicationStageGreaterThan(ApplicationState::Company);
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
								$q->isApplicationApproved()->inGovtStage();
							})->orWhere(function($q){
								$q->whereApplicationStageGreaterThan(ApplicationState::Company);
							});
						});
					}
					if($value == 'rejected'){
						$query->isApplicationRejected()->inGovtStage();
					}
					if($value == 'pending'){
						$query->isApplicationPending()->inGovtStage();
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
			->firstOrFail();
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
	}

	
	public function getTotalApplicationCount(): int
	{
		return Application::whereApplicationStageGreaterThan(ApplicationState::Company)
		->count();
	}

	public function getTotalApprovedApplicationCount(): int
	{
		return Application::where(function($qry){
			$qry->where(function($q){
				$q->inGovtStage()->isApplicationApproved();
			})->orWhere(function($q){
				$q->whereApplicationStageGreaterThan(ApplicationState::Govt);
			});
		})->count();
	}

	public function getTotalRejectedApplicationCount(): int
	{
		return Application::where(function($qry){
			$qry->inGovtStage()->isApplicationRejected();
		})->count();
	}

	public function getTotalPendingApplicationCount(): int
	{
		return Application::where(function($qry){
			$qry->inGovtStage()->isApplicationPending();
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
