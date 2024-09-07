<?php

namespace App\Http\Traits;

use App\Http\Enums\Guards;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;
use Illuminate\Database\Eloquent\Builder;

trait ScholarshipApplicationTrait
{
	public function scopeCommonWith(Builder $query): Builder
	{
		return $query->with([
			'basic_detail',
			'mark' => fn($query) => $query->with(['graduation' => fn($q) => $q->with('scholarship_fee'), 'course', 'class']),
			'account',
			'company' => fn($query) => $query->with(['taluq', 'district']),
			'institute' => fn($query) => $query->with(['auth' => fn($q) => $q->with('address')]),
			'industry'
		]);
	}

	public function scopeCommonRelation(Builder $query): Builder
	{
		return $query->whereHas('basic_detail')
		->whereHas('mark', fn($query) => $query->with(['graduation' => fn($q) => $q->with('scholarship_fee'), 'course', 'class'])->whereHas('graduation'))
		->whereHas('account')
		->whereHas('company') ;
	}

	public function scopeWhereApplicationStatus(Builder $query, ApplicationStatus $status): Builder
	{
		return $query->where('status', $status->value);
	}

	public function scopeWhereNotApplicationStatus(Builder $query, ApplicationStatus $status): Builder
	{
		return $query->where('status', '!=', $status->value);
	}

	public function scopeIsApplicationApproved(Builder $query): Builder
	{
		return $query->whereApplicationStatus(ApplicationStatus::Approve);
	}

	public function scopeIsApplicationRejected(Builder $query): Builder
	{
		return $query->whereApplicationStatus(ApplicationStatus::Reject);
	}

	public function scopeIsApplicationPending(Builder $query): Builder
	{
		return $query->whereApplicationStatus(ApplicationStatus::Pending);
	}

	public function scopeWhereApplicationStage(Builder $query, ApplicationState $stage): Builder
	{
		return $query->where('application_state', $stage->value);
	}

	public function scopeWhereApplicationStageGreaterThan(Builder $query, ApplicationState $stage): Builder
	{
		return $query->where('application_state', '>', $stage->value);
	}

	public function scopeInSchoolStage(Builder $query): Builder
	{
		return $query->whereApplicationStage(ApplicationState::School);
	}

	public function scopeInCompanyStage(Builder $query): Builder
	{
		return $query->whereApplicationStage(ApplicationState::Company);
	}

	public function scopeInGovtStage(Builder $query): Builder
	{
		return $query->whereApplicationStage(ApplicationState::Govt);
	}

	public function scopeInAdminStage(Builder $query): Builder
	{
		return $query->whereApplicationStage(ApplicationState::Govt);
	}

	public function scopeBelongsToAuthStudent(Builder $query): Builder
	{
		return $query->where('student_id', auth()->guard(Guards::Web->value())->user()->id);
	}

	public function scopeBelongsToAuthSchool(Builder $query): Builder
	{
		return $query->where('school_id', auth()->guard(Guards::Institute->value())->user()->school->institute->id);
	}

	public function scopeBelongsToAuthCompany(Builder $query): Builder
	{
		return $query->where('company_id', auth()->guard(Guards::Industry->value())->user()->reg_industry_id);
	}


}
