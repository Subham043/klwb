<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;
use Illuminate\Http\Request;

class FinanceScholarshipApproveController extends Controller
{
    public function __construct(private FinanceScholarshipService $scholarshipService){}

    public function index(Request $request, $id){
        $application = $this->scholarshipService->getById($id);
        $application->update([
            'pay_status' => ApplicationStatus::Approve->value,
        ]);
        return response()->json(['message' => 'Application approved successfully.'], 200);
    }
}
