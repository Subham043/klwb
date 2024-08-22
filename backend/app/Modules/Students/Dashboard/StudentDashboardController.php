<?php

namespace App\Modules\Students\Dashboard;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\ApplicationDates\Services\ApplicationDateService;
use App\Modules\ApplicationManagement\Applications\Services\ScholarshipService;

class StudentDashboardController extends Controller
{
	private $scholarshipService;
	private $applicationDateService;

	public function __construct(ScholarshipService $scholarshipService, ApplicationDateService $applicationDateService)
	{
		$this->scholarshipService = $scholarshipService;
		$this->applicationDateService = $applicationDateService;
	}

	public function index()
	{
		$applicationDate = $this->applicationDateService->getLatest();
		$application = $this->scholarshipService->getLatest();
		$response = [
			'is_scholarship_open' => false,
			'is_eligible_to_apply' => false,
			'can_resubmit' => false,
			'message' => "Scholarship applications are open.",
			'total_application' => $this->scholarshipService->getTotalApplicationCount(),
			'total_approved_application' => $this->scholarshipService->getTotalApprovedApplicationCount(),
			'total_rejected_application' => $this->scholarshipService->getTotalRejectedApplicationCount(),
			'total_scholarship_amount' => $this->scholarshipService->getTotalScholarshipAmount(),
		];
		$areScholarshipApplicationOpen = (new ApplicationDateService)->areScholarshipApplicationOpen();
		if (!$areScholarshipApplicationOpen) {
			$response['message'] = "Scholarship applications are closed as of now for the current year. Please check back later.";
		} else {
			$response['is_scholarship_open'] = true;
			$response['is_eligible_to_apply'] = $this->scholarshipService->isEligibleForScholarship();
			if (!$response['is_eligible_to_apply']) {
				$response['message'] = "You have already applied scholarship for the year " . $applicationDate->application_year;
				$response['can_resubmit'] = $this->scholarshipService->canResubmit($application);
				if($response['can_resubmit']){
					$response['message'] = "Your application has been rejected. Please rectify it and resubmit. The reason behind rejection is " . ($application->reject_reason ?? "Unknown");
				}
			}
		}
		return response()->json($response, 200);
	}
}
