<?php

namespace App\Modules\InstituteManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\InstituteManagement\Scholarship\Requests\InstituteRejectScholarshipRequest;
use App\Modules\InstituteManagement\Scholarship\Services\InstituteScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;

class InstituteScholarshipRejectController extends Controller
{
    public function __construct(private InstituteScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Reject a scholarship application.
     *
     * @param InstituteRejectScholarshipRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(InstituteRejectScholarshipRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        if($this->applicationChecks->canSchoolApprove($application)){
            $application->update([
                'school_approve' => now(),
                'status' => ApplicationStatus::Reject->value,
                'reject_reason' => $request->reason,
            ]);
            return response()->json(['message' => 'Application rejected successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
