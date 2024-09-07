<?php
namespace App\Http\Interfaces;

use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;
use Illuminate\Database\Eloquent\Builder;

interface ScholarshipApplicationTraitInterface
{
	public function scopeCommonWith(Builder $query): Builder;
	public function scopeCommonRelation(Builder $query): Builder;
	public function scopeWhereApplicationStatus(Builder $query, ApplicationStatus $status): Builder;
	public function scopeWhereNotApplicationStatus(Builder $query, ApplicationStatus $status): Builder;
	public function scopeIsApplicationApproved(Builder $query): Builder;
	public function scopeIsApplicationRejected(Builder $query): Builder;
	public function scopeIsApplicationPending(Builder $query): Builder;
	public function scopeWhereApplicationStage(Builder $query, ApplicationState $stage): Builder;
	public function scopeWhereApplicationStageGreaterThan(Builder $query, ApplicationState $stage): Builder;
	public function scopeInSchoolStage(Builder $query): Builder;
	public function scopeInCompanyStage(Builder $query): Builder;
	public function scopeInGovtStage(Builder $query): Builder;
	public function scopeInAdminStage(Builder $query): Builder;
	public function scopeBelongsToAuthStudent(Builder $query): Builder;
	public function scopeBelongsToAuthSchool(Builder $query): Builder;
	public function scopeBelongsToAuthCompany(Builder $query): Builder;
}