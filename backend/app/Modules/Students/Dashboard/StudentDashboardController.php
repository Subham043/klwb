<?php

namespace App\Modules\Students\Dashboard;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Students\Scholarship\Services\ScholarshipService;

class StudentDashboardController extends Controller
{
	public function __construct(private ScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

	/**
	 * Get the dashboard information of the student.
	 * 
	 * The response will contain the following information:
	 * - is_scholarship_open: a boolean indicating whether the scholarship is currently open or not.
	 * - is_eligible_to_apply: a boolean indicating whether the student is eligible to apply for the scholarship or not.
	 * - can_resubmit: a boolean indicating whether the student can resubmit the application or not.
	 * - message: a string containing a message to be displayed to the student. The message will be "Scholarship applications are open." if the scholarship is open.
	 * - total_application: the total number of applications for the current year.
	 * - total_approved_application: the total number of approved applications for the current year.
	 * - total_rejected_application: the total number of rejected applications for the current year.
	 * - total_scholarship_amount: the total amount of scholarship that has been given out for the current year.
	 */
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
