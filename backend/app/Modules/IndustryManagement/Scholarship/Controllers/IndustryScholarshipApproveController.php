<?php

namespace App\Modules\IndustryManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\ScholarshipHelperService;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\IndustryManagement\Scholarship\Events\IndustryScholarshipApproved;
use App\Modules\IndustryManagement\Scholarship\Requests\IndustryApproveScholarshipRequest;
use App\Modules\IndustryManagement\Scholarship\Services\IndustryScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;

class IndustryScholarshipApproveController extends Controller
{

    public function __construct(private IndustryScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Approve a scholarship application.
     *
     * @param IndustryApproveScholarshipRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(IndustryApproveScholarshipRequest $request, $id){
        $application = $this->scholarshipService->getById($id);
        $wrappedApplication = (new ScholarshipHelperService)->industryPaymentWrapper($application);
        if($this->applicationChecks->canCompanyApprove($wrappedApplication)){
            $application->update([
                'company_approve' => now(),
                'status' => ApplicationStatus::Pending->value,
		        'application_state' => ApplicationState::Govt->value,
                ...$request->validated()
            ]);
            IndustryScholarshipApproved::dispatch($wrappedApplication->student->email ?? null, $wrappedApplication->student->phone ?? null, $wrappedApplication->student->name ?? null, $wrappedApplication, $wrappedApplication->industryPaymentInfo);
            return response()->json(['message' => 'Application approved successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
