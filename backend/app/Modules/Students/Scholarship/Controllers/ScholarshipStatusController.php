<?php

namespace App\Modules\Students\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Students\Scholarship\Resources\ApplicationCollection;
use App\Modules\Students\Scholarship\Services\ScholarshipService;

class ScholarshipStatusController extends Controller
{

    public function __construct(private ScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Retrieves the latest scholarship application date and application details,
     * and constructs a response indicating the scholarship application status.
     * The response includes whether the scholarship is open, the eligibility to apply,
     * and whether resubmission is possible, along with a message indicating the current status.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function index(){
        $applicationDate = $this->applicationChecks->getLatestApplicationDate();
        $applicationMain = $this->scholarshipService->getLatest();
        $application = $applicationMain ? $this->scholarshipService->industryPaymentWrapper($applicationMain) : $applicationMain;
        $response = [
            'application_date' => $applicationDate ? ApplicationDateCollection::make($applicationDate) : null,
            'application' => $application ? ApplicationCollection::make($application) : null,
            'is_scholarship_open' => false,
            'is_eligible_to_apply' => false,
            'can_resubmit' => false,
            'message' => "You can apply for scholarship"
        ];
		if ($applicationDate->has_expired) {
            $response['message'] = "Scholarship applications are closed as of now for the current year. Please check back later.";
        }else{
            $response['is_scholarship_open'] = true;
        }
        $response['is_eligible_to_apply'] = $this->applicationChecks->isEligibleForScholarship();
        if(!$response['is_eligible_to_apply']){
            $response['message'] = "You have already applied scholarship for the year ".$applicationDate->application_year;
            $response['can_resubmit'] = $application ? $this->applicationChecks->canResubmit($application) : false;
        }
        return response()->json($response, 200);
    }
}
