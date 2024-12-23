<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Admins\Scholarship\Resources\AdminApplicationCollection;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;

class AdminScholarshipViewController extends Controller
{

    public function __construct(private AdminScholarshipService $scholarshipService, private ScholarshipApplicationChecksService $applicationChecks){}

    /**
     * Return the view for the admin to verify the application
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $applicationDate = $this->applicationChecks->getLatestApplicationDate();
        $application = $this->scholarshipService->getById($id);
        $response = [
            'application_date' => $applicationDate ? ApplicationDateCollection::make($applicationDate) : null,
            'application' => $application ? AdminApplicationCollection::make($application) : null,
            'can_approve' => false,
        ];
        $response['can_approve'] = $this->applicationChecks->canAdminVerify($application);
        return response()->json($response, 200);
    }
}
