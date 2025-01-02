<?php

namespace App\Modules\Govt\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Govt\Scholarship\Events\GovtScholarshipRejected;
use App\Modules\Govt\Scholarship\Requests\GovtRejectScholarshipRequest;
use App\Modules\Govt\Scholarship\Services\GovtScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;

class GovtScholarshipRejectController extends Controller
{
    public function __construct(private GovtScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

/**
 * Reject a government scholarship application.
 *
 * Validates the request and checks if the application can be verified 
 * by the government. If verification is successful, updates the 
 * application with rejection details and returns a success message.
 * Otherwise, returns a permission error message.
 *
 * @param GovtRejectScholarshipRequest $request
 * @param int $id
 * @return \Illuminate\Http\JsonResponse
 */

    public function index(GovtRejectScholarshipRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        if($this->applicationChecks->canGovtVerify($application)){
            $application->update([
                'govt_approve' => now(),
                'status' => ApplicationStatus::Reject->value,
                'reject_reason' => $request->reason,
                'govt_approve_by' => auth()->guard(Guards::Admin->value())->user()->id
            ]);
            GovtScholarshipRejected::dispatch($application->student->email ?? null, $application->student->phone ?? null, $application->student->name ?? null, $request->reason);
            return response()->json(['message' => 'Application rejected successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
