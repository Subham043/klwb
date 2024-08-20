<?php

namespace App\Modules\ApplicationManagement\Applications\Services;

use App\Http\Enums\Guards;
use App\Modules\ApplicationManagement\ApplicationDates\Services\ApplicationDateService;
use App\Modules\ApplicationManagement\Applications\Models\Application;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class InstituteScholarshipService
{

	public function canApprove(Application $application): bool
	{
		if (!(new ApplicationDateService)->areScholarshipApplicationOpen()) {
			return false;
		}
		$application_date = (new ApplicationDateService)->getLatest();
		if ((($application->date->between($application_date->from_date->format('Y-m-d'), $application_date->to_date->addDay(1)->format('Y-m-d')))) && $application->status == 0 && $application->application_state == 1 && $application_date->can_approve) {
			return true;
		}
		return false;
	}

	protected function model(): Builder
	{
		return Application::with([
			'basic_detail',
			'mark' => fn($query) => $query->with(['graduation' => fn($q) => $q->with('scholarship_fee'), 'course', 'class']),
			'account',
			'company' => fn($query) => $query->with(['taluq', 'district']),
			'institute' => fn($query) => $query->with(['registration' => fn($q) => $q->with('address')]),
			'industry'
		])
			->where('school_id', auth()->guard(Guards::Institute->value())->user()->school->registered_institute->id)
			->whereHas('basic_detail')
			->whereHas('mark', fn($query) => $query->with(['graduation' => fn($q) => $q->with('scholarship_fee'), 'course', 'class'])->whereHas('graduation'))
			->whereHas('account')
			->whereHas('company');
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
								$q->where('status', 1)->where('application_state', 1);
							})->orWhere(function($q){
								$q->where('application_state', '>', 1);
							});
						});
					}
					if($value == 'rejected'){
						$query->where('status', 2)->where('application_state', 1);
					}
					if($value == 'pending'){
						$query->where('status', 0)->where('application_state', 1);
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
