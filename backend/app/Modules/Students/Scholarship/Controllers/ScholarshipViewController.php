<?php

namespace App\Modules\Students\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\ScholarshipHelperService;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Students\Scholarship\Resources\ApplicationCollection;
use App\Modules\Students\Scholarship\Services\ScholarshipService;

class ScholarshipViewController extends Controller
{
    public function __construct(private ScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

/**
 * Retrieve the latest application date and application details for a given scholarship ID.
 *
 * This method checks if the scholarship application can be resubmitted
 * and constructs a JSON response with the application date, application details,
 * and resubmission eligibility status.
 *
 * @param int $id The ID of the scholarship application to retrieve.
 * @return \Illuminate\Http\JsonResponse JSON response containing application date, application details, and resubmission eligibility.
 */

    public function index($id){
        $applicationDate = $this->applicationChecks->getLatestApplicationDate();
        $applicationMain = $this->scholarshipService->getById($id);
        $application = (new ScholarshipHelperService)->industryPaymentWrapper($applicationMain);
        $response = [
            'application_date' => $applicationDate ? ApplicationDateCollection::make($applicationDate) : null,
            'application' => $application ? ApplicationCollection::make($application) : null,
            'can_resubmit' => false,
        ];
        $response['can_resubmit'] = $this->applicationChecks->canResubmit($application);
        return response()->json($response, 200);
    }
}
