<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Finance\Scholarship\Events\FinanceScholarshipApproved;
use App\Modules\Finance\Scholarship\Requests\FinanceApproveMultipleScholarshipRequest;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;

class FinanceScholarshipApproveMultipleController extends Controller
{
    public function __construct(private FinanceScholarshipService $scholarshipService){}

    /**
     * Approve a scholarship application.
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(FinanceApproveMultipleScholarshipRequest $request){
        $request->validated();
        $ids = $request->id;
        $applications = $this->scholarshipService->getMultipleByIds($ids);
        foreach($applications as $application){
            $application->update([
                'pay_status' => ApplicationStatus::Approve->value,
            ]);
            // FinanceScholarshipApproved::dispatch($application->student->email ?? null, $application->student->phone ?? null, $application->student->name ?? null);
        }
        return response()->json(['message' => 'Applications approved successfully.'], 200);
    }
}
