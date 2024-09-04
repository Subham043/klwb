<?php

namespace App\Modules\ApplicationManagement\Applications\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Applications\Requests\IndustryRejectScholarshipRequest;
use App\Modules\ApplicationManagement\Applications\Services\IndustryScholarshipService;

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
