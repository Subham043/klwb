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
					if ($value == 'approved') {
						$query->where(function ($qry) {
							$qry->where(function ($q) {
								$q->isApplicationApproved()->inSchoolStage();
							})->orWhere(function ($q) {
								$q->whereApplicationStageGreaterThan(ApplicationState::School);
							});
						});
					}
					if ($value == 'rejected') {
						$query->isApplicationRejected()->inSchoolStage();
					}
					if ($value == 'pending') {
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
			->firstOrFail();
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
		return Application::belongsToAuthSchool()->where(function ($qry) {
			$qry->where(function ($q) {
				$q->inSchoolStage()->isApplicationApproved();
			})->orWhere(function ($q) {
				$q->whereApplicationStageGreaterThan(ApplicationState::School);
			});
		})->count();
	}

	public function getTotalRejectedApplicationCount(): int
	{
		return Application::belongsToAuthSchool()->where(function ($qry) {
			$qry->inSchoolStage()->isApplicationRejected();
		})->count();
	}

	public function getTotalPendingApplicationCount(): int
	{
		return Application::belongsToAuthSchool()->where(function ($qry) {
			$qry->inSchoolStage()->isApplicationPending();
		})->count();
	}
}


class CommonFilter implements Filter
{
	public function __invoke(Builder $query, $value, string $property)
	{
		$query->where(function ($q) use ($value) {
			$q->where('application_year', 'LIKE', '%' . $value . '%')
				->orWhere('uniq', 'LIKE', '%' . $value . '%')
				->orWhereHas('student', function ($q) use ($value) {
					$q->where('name', 'LIKE', '%' . $value . '%')
						->orWhere('email', 'LIKE', '%' . $value . '%')
						->orWhere('phone', 'LIKE', '%' . $value . '%');
				})
				->orWhereHas('institute', function ($q) use ($value) {
					$q->where('name', 'LIKE', '%' . $value . '%');
				})
				->orWhereHas('industry', function ($q) use ($value) {
					$q->where('name', 'LIKE', '%' . $value . '%');
				})
				->orWhereHas('basic_detail', function ($q) use ($value) {
					$q->where('name', 'LIKE', '%' . $value . '%')
						->orWhere('father_name', 'LIKE', '%' . $value . '%')
						->orWhere('address', 'LIKE', '%' . $value . '%')
						->orWhere('parent_phone', 'LIKE', '%' . $value . '%')
						->orWhere('category', 'LIKE', '%' . $value . '%')
						->orWhere('cast_no', 'LIKE', '%' . $value . '%')
						->orWhere('adharcard_no', 'LIKE', '%' . $value . '%')
						->orWhere('gender', 'LIKE', '%' . $value . '%')
						->orWhere('f_adhar', 'LIKE', '%' . $value . '%')
						->orWhere('m_adhar', 'LIKE', '%' . $value . '%')
						->orWhere('mother_name', 'LIKE', '%' . $value . '%');
				})
				->orWhereHas('mark', function ($q) use ($value) {
					$q->where('prv_class', 'LIKE', '%' . $value . '%')
						->orWhere('prv_marks', 'LIKE', '%' . $value . '%')
						->orWhereHas('graduation', function ($qry) use ($value) {
							$qry->where('name', 'LIKE', '%' . $value . '%')
								->orWhereHas('scholarship_fee', function ($q) use ($value) {
									$q->where('amount', 'LIKE', '%' . $value . '%');
								});
						})
						->orWhereHas('class', function ($qry) use ($value) {
							$qry->where('name', 'LIKE', '%' . $value . '%');
						})
						->orWhereHas('course', function ($qry) use ($value) {
							$qry->where('name', 'LIKE', '%' . $value . '%');
						});
				})
				->orWhereHas('company', function ($q) use ($value) {
					$q->where('who_working', 'LIKE', '%' . $value . '%')
						->orWhere('name', 'LIKE', '%' . $value . '%')
						->orWhere('relationship', 'LIKE', '%' . $value . '%')
						->orWhere('msalary', 'LIKE', '%' . $value . '%')
						->orWhere('pincode', 'LIKE', '%' . $value . '%')
						->orWhereHas('district', function ($qry) use ($value) {
							$qry->where('name', 'LIKE', '%' . $value . '%');
						})
						->orWhereHas('taluq', function ($qry) use ($value) {
							$qry->where('name', 'LIKE', '%' . $value . '%');
						});
				})
				->orWhereHas('account', function ($q) use ($value) {
					$q->where('branch', 'LIKE', '%' . $value . '%')
						->orWhere('name', 'LIKE', '%' . $value . '%')
						->orWhere('ifsc', 'LIKE', '%' . $value . '%')
						->orWhere('acc_no', 'LIKE', '%' . $value . '%')
						->orWhere('holder', 'LIKE', '%' . $value . '%')
						->orWhere('type', 'LIKE', '%' . $value . '%');
				});
		});
	}
}