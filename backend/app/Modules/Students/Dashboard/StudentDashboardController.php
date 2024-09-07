<?php

namespace App\Modules\Students\Dashboard;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Students\Scholarship\Services\ScholarshipService;

class StudentDashboardController extends Controller
{
	public function __construct(private ScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

	public function index()
	{
		$applicationDate = $this->applicationChecks->getLatestApplicationDate();
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
		if ($applicationDate->has_expired) {
			$response['message'] = "Scholarship applications are closed as of now for the current year. Please check back later.";
		} else {
			$response['is_scholarship_open'] = true;
			$response['is_eligible_to_apply'] = $this->applicationChecks->isEligibleForScholarship();
			if (!$response['is_eligible_to_apply']) {
				$response['message'] = "You have already applied scholarship for the year " . $applicationDate->application_year;
				$response['can_resubmit'] = $this->applicationChecks->canResubmit($application);
				if($response['can_resubmit']){
					$response['message'] = "Your application has been rejected. Please rectify it and resubmit. The reason behind rejection is " . ($application->reject_reason ?? "Unknown");
				}
			}
		}
		return response()->json($response, 200);
	}
}
