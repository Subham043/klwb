<?php

namespace App\Modules\IndustryManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\IndustryManagement\Scholarship\Requests\IndustryRejectScholarshipRequest;
use App\Modules\IndustryManagement\Scholarship\Services\IndustryScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;

class IndustryScholarshipRejectController extends Controller
{
    public function __construct(private IndustryScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    public function index(IndustryRejectScholarshipRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        if($this->applicationChecks->canCompanyApprove($application)){
            $application->update([
                'company_approve' => now(),
                'status' => ApplicationStatus::Reject->value,
                'reject_reason' => $request->reason,
                'industry_reject_comment' => $request->comment,
            ]);
            return response()->json(['message' => 'Application rejected successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
