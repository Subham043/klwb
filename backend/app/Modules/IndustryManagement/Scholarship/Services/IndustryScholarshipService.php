<?php

namespace App\Modules\IndustryManagement\Scholarship\Services;

use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Models\Application;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class IndustryScholarshipService
{

	protected function model(): Builder
	{
		return Application::commonWith()
		->commonRelation()
		->belongsToAuthCompany()
		->whereApplicationStageGreaterThan(ApplicationState::School);
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
								$q->isApplicationApproved()->inCompanyStage();
							})->orWhere(function($q){
								$q->whereApplicationStageGreaterThan(ApplicationState::Company);
							});
						});
					}
					if($value == 'rejected'){
						$query->isApplicationRejected()->inCompanyStage();
					}
					if($value == 'pending'){
						$query->isApplicationPending()->inCompanyStage();
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
		return Application::belongsToAuthCompany()
		->whereApplicationStageGreaterThan(ApplicationState::School)
		->count();
	}

	public function getTotalApprovedApplicationCount(): int
	{
		return Application::belongsToAuthCompany()->where(function($qry){
			$qry->where(function($q){
				$q->inCompanyStage()->isApplicationApproved();
			})->orWhere(function($q){
				$q->whereApplicationStageGreaterThan(ApplicationState::Company);
			});
		})->count();
	}

	public function getTotalRejectedApplicationCount(): int
	{
		return Application::belongsToAuthCompany()->where(function($qry){
			$qry->inCompanyStage()->isApplicationRejected();
		})->count();
	}

	public function getTotalPendingApplicationCount(): int
	{
		return Application::belongsToAuthCompany()->where(function($qry){
			$qry->inCompanyStage()->isApplicationPending();
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
