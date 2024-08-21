<?php

namespace App\Modules\ApplicationManagement\Applications\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Applications\Requests\IndustryApproveScholarshipRequest;
use App\Modules\ApplicationManagement\Applications\Services\IndustryScholarshipService;

class IndustryScholarshipApproveController extends Controller
{
    private $scholarshipService;

    public function __construct(IndustryScholarshipService $scholarshipService)
    {
        $this->scholarshipService = $scholarshipService;
    }

    public function index(IndustryApproveScholarshipRequest $request, $id){
        $application = $this->scholarshipService->getById($id);
        if($this->scholarshipService->canApprove($application)){
            $application->update([
                'company_approve' => now(),
                'status' => 0,
		        'application_state' => 3,
                ...$request->validated()
            ]);
            return response()->json(['message' => 'Application approved successfully.'], 200);
        }
        return response()->json(['message' => 'Oops. You do not have the permission to approve.'], 400);
    }
}
