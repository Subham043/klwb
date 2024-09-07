<?php

namespace App\Modules\IndustryManagement\Dashboard;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Scholarship\Services\IndustryScholarshipService;

class IndustryDashboardController extends Controller
{
	public function __construct(private IndustryScholarshipService $scholarshipService){}

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
