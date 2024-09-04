<?php

namespace App\Modules\ApplicationManagement\Applications\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Applications\Requests\InstituteRejectScholarshipRequest;
use App\Modules\ApplicationManagement\Applications\Services\InstituteScholarshipService;

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
