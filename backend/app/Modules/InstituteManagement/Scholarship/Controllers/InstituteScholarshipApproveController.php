<?php

namespace App\Modules\InstituteManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\InstituteManagement\Scholarship\Services\InstituteScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;
use Illuminate\Http\Request;

class InstituteScholarshipApproveController extends Controller
{
    public function __construct(private InstituteScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    public function index(Request $request, $id){
        $application = $this->scholarshipService->getById($id);
        if($this->applicationChecks->canSchoolApprove($application)){
            $application->update([
                'school_approve' => now(),
                'status' => ApplicationStatus::Pending->value,
		        'application_state' => ApplicationState::Company->value,
            ]);
            return response()->json(['message' => 'Application approved successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
