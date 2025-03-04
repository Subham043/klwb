<?php

namespace App\Modules\Admins\ApplicationDates\Services;

use App\Http\Enums\Guards;
use App\Modules\Admins\ApplicationDates\Models\ApplicationDate;
// use App\Modules\Auth\Institute\Accounts\Services\ProfileService as InstituteProfileService;
// use App\Modules\Auth\Industry\Accounts\Services\ProfileService as IndustryProfileService;
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
				->applicationIsActive()
				->where('application_year', $this->latestApplicationDate->application_year)
				->where('application_date_id', $this->latestApplicationDate->id)
				->whereBetween('date', [$this->latestApplicationDate->from_date, $this->latestApplicationDate->to_date->addDay(1)])
				->first();
			if($application) {
				return false;
			}
			return true;
	}

	public function isApplicationLatest(Application $application): bool
	{
		return $application->date->between($this->latestApplicationDate->from_date->format('Y-m-d'), $this->latestApplicationDate->to_date->addDay(1)->format('Y-m-d'));
	}
	
	public function isApplicationRejected(Application $application): bool
	{
		return $application->status == ApplicationStatus::Reject->value;
	}
	
	public function isApplicationPending(Application $application): bool
	{
		return $application->status == ApplicationStatus::Pending->value;
	}
	
	public function isApplicationPaymentPending(Application $application): bool
	{
		return $application->pay_status == ApplicationStatus::Pending->value;
	}
	
	public function isApplicationApproved(Application $application): bool
	{
		return $application->status == ApplicationStatus::Approve->value;
	}
	
	public function canResubmit(Application $application): bool
	{
		if ($this->isApplicationLatest($application) && $this->isApplicationRejected($application) && $this->latestApplicationDate->can_resubmit) {
			return true;
		}
		return false;
	}

	private function canApprove(Application $application): bool
	{
		if ($this->isApplicationLatest($application) && $this->isApplicationPending($application) && $this->latestApplicationDate->can_approve) {
			return true;
		}
		return false;
	}

	private function canVerify(Application $application): bool
	{
		if ($this->isApplicationLatest($application) && $this->isApplicationPending($application) && $this->latestApplicationDate->can_verify) {
			return true;
		}
		return false;
	}

	public function canSchoolApprove(Application $application): bool
	{
		// $schoolAccinfo = (new InstituteProfileService)->getAccountInfo();
		// $has_school_files = ($schoolAccinfo->reg_certification_link!=null && $schoolAccinfo->principal_signature_link!=null && $schoolAccinfo->seal_link!=null);
		// return $application->application_state == ApplicationState::School->value && $has_school_files && $this->canApprove($application);
		return $application->application_state == ApplicationState::School->value && $this->canApprove($application);
	}

	public function canCompanyApprove(Application $application): bool
	{
		// $companyAccinfo = (new IndustryProfileService)->getAccountInfo();
		//$has_company_files = ($companyAccinfo->reg_doc_link!=null && $companyAccinfo->sign_link!=null && $companyAccinfo->seal_link!=null && $companyAccinfo->gst_link!=null && $companyAccinfo->pan_link!=null && $application->industryPaymentInfo);
		// return $application->application_state == ApplicationState::Company->value && $has_company_files && $this->canApprove($application);
		return $application->application_state == ApplicationState::Company->value && $this->canApprove($application);
	}

	public function canGovtVerify(Application $application): bool
	{
		return $application->application_state == ApplicationState::Govt->value && $this->canVerify($application);
	}
	
	public function canGovtApproveReject(Application $application): bool
	{
		return (($application->application_state == ApplicationState::Govt->value && ($this->isApplicationPending($application) || $this->isApplicationApproved($application) || $this->isApplicationRejected($application))) || ($application->application_state == ApplicationState::Admin->value && $this->isApplicationPending($application))) && $this->isApplicationLatest($application) && $this->latestApplicationDate->can_verify;
	}

	public function canAdminVerify(Application $application): bool
	{
		return $application->application_state == ApplicationState::Admin->value && $this->canVerify($application);
	}

	public function canAdminApproveReject(Application $application): bool
	{
		return $application->application_state == ApplicationState::Admin->value && $this->isApplicationLatest($application) && ($this->isApplicationPending($application) || $this->isApplicationApproved($application) || $this->isApplicationRejected($application)) && $this->latestApplicationDate->can_verify;
	}
	
	public function canFinanceVerify(Application $application): bool
	{
		if ($this->isApplicationLatest($application) && $this->isApplicationPaymentPending($application) && $this->isApplicationApproved($application) && $application->application_state == ApplicationState::Admin->value && $this->latestApplicationDate->can_verify) {
			return true;
		}
		return false;
	}
}