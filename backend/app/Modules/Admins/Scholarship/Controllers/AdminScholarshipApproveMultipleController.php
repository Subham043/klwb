<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Admins\Scholarship\Requests\AdminApproveMultipleScholarshipRequest;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;

class AdminScholarshipApproveMultipleController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Approve a scholarship application.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(AdminApproveMultipleScholarshipRequest $request){
        $request->validated();
        $ids = $request->id;
        $applications = $this->scholarshipService->getMultipleByIds($ids);
        foreach($applications as $application){
            if($this->applicationChecks->canAdminVerify($application)){
                $application->update([
                    'admin_approve' => now(),
                    'status' => ApplicationStatus::Approve->value,
                    'application_state' => ApplicationState::Admin->value,
                ]);
            }
        }
        return response()->json(['message' => 'Applications approved successfully.'], 200);
    }
}
