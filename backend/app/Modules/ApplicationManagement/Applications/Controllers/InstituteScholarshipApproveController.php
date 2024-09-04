<?php

namespace App\Modules\ApplicationManagement\Applications\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Applications\Services\InstituteScholarshipService;
use Illuminate\Http\Request;

class InstituteScholarshipApproveController extends Controller
{
    public function __construct(private InstituteScholarshipService $scholarshipService){}

    public function index(Request $request, $id){
        $application = $this->scholarshipService->getById($id);
        if($this->scholarshipService->canApprove($application)){
            $application->update([
                'school_approve' => now(),
                'status' => 0,
		        'application_state' => 2,
            ]);
            return response()->json(['message' => 'Application approved successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
