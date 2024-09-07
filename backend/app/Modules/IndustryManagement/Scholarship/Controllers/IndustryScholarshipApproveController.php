<?php

namespace App\Modules\IndustryManagement\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Scholarship\Requests\IndustryApproveScholarshipRequest;
use App\Modules\IndustryManagement\Scholarship\Services\IndustryScholarshipService;

class IndustryScholarshipApproveController extends Controller
{

    public function __construct(private IndustryScholarshipService $scholarshipService){}

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
