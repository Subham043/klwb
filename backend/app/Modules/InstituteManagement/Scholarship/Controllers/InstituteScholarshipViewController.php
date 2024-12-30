<?php

namespace App\Modules\InstituteManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Students\Scholarship\Resources\ApplicationCollection;
use App\Modules\InstituteManagement\Scholarship\Services\InstituteScholarshipService;

class InstituteScholarshipViewController extends Controller
{

    public function __construct(private InstituteScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Get the latest application date and the application by the given id for the school to view
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $applicationDate = $this->applicationChecks->getLatestApplicationDate();
        $application = $this->scholarshipService->getById($id);
        $response = [
            'application_date' => $applicationDate ? ApplicationDateCollection::make($applicationDate) : null,
            'application' => $application ? ApplicationCollection::make($application) : null,
            'can_approve' => false,
        ];
        $response['can_approve'] = $this->applicationChecks->canSchoolApprove($application);
        return response()->json($response, 200);
    }
}
