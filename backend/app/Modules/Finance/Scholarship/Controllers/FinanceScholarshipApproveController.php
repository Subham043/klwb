<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Finance\Scholarship\Events\FinanceScholarshipApproved;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;
use Illuminate\Http\Request;

class FinanceScholarshipApproveController extends Controller
{
    public function __construct(private FinanceScholarshipService $scholarshipService){}

    /**
     * Approve a scholarship application.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request, $id){
        $application = $this->scholarshipService->getById($id);
        $application->update([
            'pay_status' => ApplicationStatus::Approve->value,
        ]);
        // FinanceScholarshipApproved::dispatch($application->student->email ?? null, $application->student->phone ?? null, $application->student->name ?? null);
        return response()->json(['message' => 'Application approved successfully.'], 200);
    }
}
