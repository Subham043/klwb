<?php

namespace App\Modules\Govt\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Govt\Scholarship\Services\GovtScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;
use Illuminate\Http\Request;

class GovtScholarshipApproveController extends Controller
{
    public function __construct(private GovtScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Approve a scholarship application.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, $id){
        $application = $this->scholarshipService->getById($id);
        if($this->applicationChecks->canGovtVerify($application)){
            $application->update([
                'govt_approve' => now(),
                'status' => ApplicationStatus::Pending->value,
		        'application_state' => ApplicationState::Admin->value,
                'govt_approve_by' => auth()->guard(Guards::Admin->value())->user()->id
            ]);
            return response()->json(['message' => 'Application approved successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
