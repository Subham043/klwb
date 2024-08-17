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
            'is_eligible' => false,
            'is_scholarship_open' => false,
            'message' => "You can apply for scholarship"
        ];
        $areScholarshipApplicationOpen = (new ApplicationDateService)->areScholarshipApplicationOpen();
		if (!$areScholarshipApplicationOpen) {
            $response['message'] = "Scholarship applications are closed as of now for the current year. Please check back later.";
        }else{
            $response['is_scholarship_open'] = true;
        }
        if(!$this->scholarshipService->isEligibleForScholarship()){
            $response['message'] = "You have already applied scholarship for the year ".$applicationDate->application_year;
        }else{
            $response['is_eligible'] = true;
        }
        return response()->json($response, 200);
    }
}
