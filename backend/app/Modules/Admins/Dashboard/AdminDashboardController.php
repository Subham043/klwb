<?php

namespace App\Modules\Admins\Dashboard;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;

class AdminDashboardController extends Controller
{
	public function __construct(private AdminScholarshipService $scholarshipService){}

	/**
	 * Display a listing of the resource.
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
