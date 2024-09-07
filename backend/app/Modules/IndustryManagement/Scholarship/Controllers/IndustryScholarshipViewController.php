<?php

namespace App\Modules\IndustryManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;
use App\Modules\Students\Scholarship\Resources\ApplicationCollection;
use App\Modules\IndustryManagement\Scholarship\Services\IndustryScholarshipService;

class IndustryScholarshipViewController extends Controller
{

    public function __construct(private IndustryScholarshipService $scholarshipService, private ApplicationDateService $applicationDateService){}

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
