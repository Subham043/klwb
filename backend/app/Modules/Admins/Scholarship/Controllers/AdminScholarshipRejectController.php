<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Admins\Scholarship\Events\AdminScholarshipRejected;
use App\Modules\Admins\Scholarship\Requests\AdminRejectScholarshipRequest;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;

class AdminScholarshipRejectController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Reject a scholarship application.
     *
     * @param AdminRejectScholarshipRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(AdminRejectScholarshipRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        if($this->applicationChecks->canAdminApproveReject($application) && $application->status != ApplicationStatus::Reject->value){
            $application->update([
                'admin_approve' => now(),
                'status' => ApplicationStatus::Reject->value,
                'reject_reason' => $request->reason,
            ]);
            AdminScholarshipRejected::dispatch($application->student->email ?? null, $application->student->phone ?? null, $application->student->name ?? null, $request->reason);
            return response()->json(['message' => 'Application rejected successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to reject.'], 400);
    }
}
