<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\ScholarshipHelperService;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Finance\Scholarship\Resources\FinanceApplicationCollection;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;

class FinanceScholarshipViewController extends Controller
{

    public function __construct(private FinanceScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Get the latest application date and the application by the given id for the finance department to view
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $applicationDate = $this->applicationChecks->getLatestApplicationDate();
        $applicationMain = $this->scholarshipService->getById($id);
        $application = (new ScholarshipHelperService)->industryPaymentWrapper($applicationMain);
        $response = [
            'application_date' => $applicationDate ? ApplicationDateCollection::make($applicationDate) : null,
            'application' => $application ? FinanceApplicationCollection::make($application) : null,
        ];
        return response()->json($response, 200);
    }
}
