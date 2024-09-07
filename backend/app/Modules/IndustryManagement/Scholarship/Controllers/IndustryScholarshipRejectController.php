<?php

namespace App\Modules\IndustryManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Scholarship\Requests\IndustryRejectScholarshipRequest;
use App\Modules\IndustryManagement\Scholarship\Services\IndustryScholarshipService;

class IndustryScholarshipRejectController extends Controller
{
    public function __construct(private IndustryScholarshipService $scholarshipService){}

    public function index(IndustryRejectScholarshipRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        if($this->scholarshipService->canApprove($application)){
            $application->update([
                'company_approve' => now(),
                'status' => 2,
                'reject_reason' => $request->reason,
                'industry_reject_comment' => $request->comment,
            ]);
            return response()->json(['message' => 'Application rejected successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
