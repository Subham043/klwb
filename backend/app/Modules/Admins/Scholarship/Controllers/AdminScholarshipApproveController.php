<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Admins\Scholarship\Events\AdminScholarshipApproved;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;
use Illuminate\Http\Request;

class AdminScholarshipApproveController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Approve a scholarship application.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, $id){
        $application = $this->scholarshipService->getById($id);
        if($this->applicationChecks->canAdminVerify($application)){
            $application->update([
                'admin_approve' => now(),
                'status' => ApplicationStatus::Approve->value,
		        'application_state' => ApplicationState::Admin->value,
            ]);
            // AdminScholarshipApproved::dispatch($application->student->email ?? null, $application->student->phone ?? null, $application->student->name ?? null);
            return response()->json(['message' => 'Application approved successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
