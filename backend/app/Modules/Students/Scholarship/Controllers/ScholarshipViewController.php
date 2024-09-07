<?php

namespace App\Modules\Students\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;
use App\Modules\Students\Scholarship\Resources\ApplicationCollection;
use App\Modules\Students\Scholarship\Services\ScholarshipService;

class ScholarshipViewController extends Controller
{
    public function __construct(private ScholarshipService $scholarshipService, private ApplicationDateService $applicationDateService){}

    public function index($id){
        $applicationDate = $this->applicationDateService->getLatest();
        $application = $this->scholarshipService->getById($id);
        $response = [
            'application_date' => $applicationDate ? ApplicationDateCollection::make($applicationDate) : null,
            'application' => $application ? ApplicationCollection::make($application) : null,
            'can_resubmit' => false,
        ];
        $response['can_resubmit'] = $this->scholarshipService->canResubmit($application);
        return response()->json($response, 200);
    }
}
