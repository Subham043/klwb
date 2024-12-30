<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Finance\Scholarship\Requests\FinanceRejectScholarshipRequest;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;

class FinanceScholarshipRejectController extends Controller
{
    public function __construct(private FinanceScholarshipService $scholarshipService){}

    /**
     * Reject a scholarship application.
     *
     * @param FinanceRejectScholarshipRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(FinanceRejectScholarshipRequest $request, $id){
        $request->validated();
        $application = $this->scholarshipService->getById($id);
        $application->update([
            'pay_status' => ApplicationStatus::Reject->value,
            'payf_reason' => $request->reason,
        ]);
        return response()->json(['message' => 'Application rejected successfully.'], 200);
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
