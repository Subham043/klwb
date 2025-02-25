<?php

namespace App\Modules\IndustryManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\IndustryManagement\Scholarship\Events\IndustryScholarshipRejected;
use App\Modules\IndustryManagement\Scholarship\Requests\IndustryRejectScholarshipRequest;
use App\Modules\IndustryManagement\Scholarship\Services\IndustryScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;

class IndustryScholarshipRejectController extends Controller
{
    public function __construct(private IndustryScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Reject a scholarship application.
     *
     * Validates the request and checks if the company can approve the application. 
     * If approved, updates the application status to rejected and logs the reason.
     *
     * @param IndustryRejectScholarshipRequest $request The request containing rejection details.
     * @param int $id The ID of the scholarship application to be rejected.
     * @return \Illuminate\Http\JsonResponse A JSON response indicating success or failure.
     */

    public function index(IndustryRejectScholarshipRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        $wrappedApplication = $this->scholarshipService->industryPaymentWrapper($application);
        if($this->applicationChecks->canCompanyApprove($wrappedApplication)){
            $application->update([
                'company_approve' => now(),
                'status' => ApplicationStatus::Reject->value,
                'reject_reason' => $request->reason,
            ]);
            IndustryScholarshipRejected::dispatch($application->student->email ?? null, $application->student->phone ?? null, $application->student->name ?? null, $request->reason);
            return response()->json(['message' => 'Application rejected successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to reject.'], 400);
    }
}
