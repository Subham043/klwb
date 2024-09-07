<?php

namespace App\Modules\Admins\ApplicationDates\Services;

use App\Http\Enums\Guards;
use App\Modules\Admins\ApplicationDates\Models\ApplicationDate;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;
use App\Modules\Students\Scholarship\Models\Application;

class ScholarshipApplicationChecksService
{
	 private ApplicationDate|null $latestApplicationDate = null;

	 public function __construct()
		{
			$this->latestApplicationDate = (new ApplicationDateService)->getLatest();
		}

	 public function getLatestApplicationDate(): ApplicationDate|null
		{
			return $this->latestApplicationDate;
		}

		public function areScholarshipApplicationOpen(): bool
		{
			if(auth(Guards::Web->value())->check()) {
				return !$this->latestApplicationDate->has_expired;
			}
			return false;
		}

		public function isEligibleForScholarship(): bool
	{
		if(!$this->areScholarshipApplicationOpen()) {
			return false;
		}
		$application = Application::belongsToAuthStudent()
				->where('application_year', $this->latestApplicationDate->application_year)
				->where('application_date_id', $this->latestApplicationDate->id)
				->whereBetween('date', [$this->latestApplicationDate->from_date, $this->latestApplicationDate->to_date->addDay(1)])
				->first();
			if($application) {
				return false;
			}
			return true;
	}

	public function canResubmit(Application $application): bool
	{
		if ((($application->date->between($this->latestApplicationDate->from_date->format('Y-m-d'), $this->latestApplicationDate->to_date->addDay(1)->format('Y-m-d')))) && $application->status == ApplicationStatus::Reject->value && $this->latestApplicationDate->can_resubmit) {
			return true;
		}
		return false;
	}

	private function canApprove(Application $application): bool
	{
		if ((($application->date->between($this->latestApplicationDate->from_date->format('Y-m-d'), $this->latestApplicationDate->to_date->addDay(1)->format('Y-m-d')))) && $application->status == ApplicationStatus::Pending->value && $this->latestApplicationDate->can_approve) {
			return true;
		}
		return false;
	}

	public function canSchoolApprove(Application $application): bool
	{
		return $application->application_state == ApplicationState::School->value && $this->canApprove($application);
	}

	public function canCompanyApprove(Application $application): bool
	{
		return $application->application_state == ApplicationState::Company->value && $this->canApprove($application);
	}
}