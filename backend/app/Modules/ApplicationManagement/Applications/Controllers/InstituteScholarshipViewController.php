<?php

namespace App\Modules\ApplicationManagement\Applications\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\ApplicationManagement\ApplicationDates\Services\ApplicationDateService;
use App\Modules\ApplicationManagement\Applications\Resources\Scholarship\ApplicationCollection;
use App\Modules\ApplicationManagement\Applications\Services\InstituteScholarshipService;

class InstituteScholarshipViewController extends Controller
{
    private $scholarshipService;
    private $applicationDateService;

    public function __construct(InstituteScholarshipService $scholarshipService, ApplicationDateService $applicationDateService)
    {
        $this->scholarshipService = $scholarshipService;
        $this->applicationDateService = $applicationDateService;
    }

    public function index($id){
        $applicationDate = $this->applicationDateService->getLatest();
        $application = $this->scholarshipService->getById($id);
        $response = [
            'application_date' => $applicationDate ? ApplicationDateCollection::make($applicationDate) : null,
            'application' => $application ? ApplicationCollection::make($application) : null,
            'can_approve' => false,
        ];
        $response['can_approve'] = $this->scholarshipService->canApprove($application);
        return response()->json($response, 200);
    }
}
