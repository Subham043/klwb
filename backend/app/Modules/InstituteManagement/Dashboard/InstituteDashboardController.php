<?php

namespace App\Modules\InstituteManagement\Dashboard;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Applications\Services\InstituteScholarshipService;

class InstituteDashboardController extends Controller
{
	private $scholarshipService;

	public function __construct(InstituteScholarshipService $scholarshipService)
	{
		$this->scholarshipService = $scholarshipService;
	}

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
