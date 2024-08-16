<?php

namespace App\Modules\ApplicationManagement\Applications\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\ApplicationManagement\ApplicationDates\Services\ApplicationDateService;
use App\Modules\ApplicationManagement\Applications\Resources\Scholarship\ApplicationCollection;
use App\Modules\ApplicationManagement\Applications\Services\ScholarshipService;

class ScholarshipStatusController extends Controller
{
    private $scholarshipService;
    private $applicationDateService;

    public function __construct(ScholarshipService $scholarshipService, ApplicationDateService $applicationDateService)
    {
        $this->scholarshipService = $scholarshipService;
        $this->applicationDateService = $applicationDateService;
    }

    public function index(){
        $applicationDate = $this->applicationDateService->getLatest();
        $application = $this->scholarshipService->getLatest();
        $response = [
            'application_date' => $applicationDate ? ApplicationDateCollection::make($applicationDate) : null,
            'application' => $application ? ApplicationCollection::make($application) : null,
        ];
        if(!$this->scholarshipService->isEligibleForScholarship()){
            return response()->json(["message" => "You have already applied scholarship for this year", ...$response, "can_apply" => false], 200);
        }
        return response()->json(["message" => "You can apply for scholarship", ...$response, "can_apply" => true], 200);
    }
}
