<?php

namespace App\Modules\InstituteManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Scholarship\Requests\InstituteRejectScholarshipRequest;
use App\Modules\InstituteManagement\Scholarship\Services\InstituteScholarshipService;

class InstituteScholarshipRejectController extends Controller
{
    public function __construct(private InstituteScholarshipService $scholarshipService){}

    public function index(InstituteRejectScholarshipRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        if($this->scholarshipService->canApprove($application)){
            $application->update([
                'school_approve' => now(),
                'status' => 2,
                'reject_reason' => $request->reason,
                'institute_reject_comment' => $request->comment,
            ]);
            return response()->json(['message' => 'Application rejected successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
