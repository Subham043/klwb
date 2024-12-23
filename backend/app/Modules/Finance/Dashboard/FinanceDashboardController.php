<?php

namespace App\Modules\Finance\Dashboard;

use App\Http\Controllers\Controller;
use App\Modules\Finance\Scholarship\Services\FinanceScholarshipService;

class FinanceDashboardController extends Controller
{
	public function __construct(private FinanceScholarshipService $scholarshipService){}

	/**
	 * Returns a JSON response containing the total number of applications, approved applications, rejected applications, and pending applications.
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
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
