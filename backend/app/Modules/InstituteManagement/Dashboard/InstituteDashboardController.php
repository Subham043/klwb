<?php

namespace App\Modules\InstituteManagement\Dashboard;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Scholarship\Services\InstituteScholarshipService;

class InstituteDashboardController extends Controller
{
	public function __construct(private InstituteScholarshipService $scholarshipService){}

	public function index()
	{
		$response = [
			'total_application' => $this->scholarshipService->getTotalApplicationCount(),
			'total_approved_application' => $this->scholarshipService->getTotalApprovedApplicationCount(),
			'total_rejected_application' => $this->scholarshipService->getTotalRejectedApplicationCount(),
			'total_pending_application' => $this->scholarshipService->getTotalPendingApplicationCount(),
		];
		return response()->json($response, 200);
	}
}
