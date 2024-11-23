<?php

namespace App\Modules\Finance\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Finance\Scholarship\Resources\FinanceApplicationCollection;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;

class FinanceScholarshipViewController extends Controller
{

    public function __construct(private FinanceScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    public function index($id){
        $applicationDate = $this->applicationChecks->getLatestApplicationDate();
        $application = $this->scholarshipService->getById($id);
        $response = [
            'application_date' => $applicationDate ? ApplicationDateCollection::make($applicationDate) : null,
            'application' => $application ? FinanceApplicationCollection::make($application) : null,
        ];
        return response()->json($response, 200);
    }
}
