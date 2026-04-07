<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Requests\VerifyContributionRequest;
use App\Modules\Admins\Contributions\Services\ContributionService;

class VerifyContributionController extends Controller
{
	public function __construct(private ContributionService $contributionService) {}

	/**
	 * Display the specified contribution.
	 *
	 * @param int $id The ID of the contribution to fetch.
	 * @return \Illuminate\Http\JsonResponse
	 */

	public function index(VerifyContributionRequest $request)
	{
		$merchant_order_no = $request->payment_id; // merchant order no
		$merchantid = config('services.sbi.id');  //merchant id
		$amount = $request->amount; // amount
		$url = config('services.sbi.verify_url'); // double verification url
		$queryRequest = "|$merchantid|$merchant_order_no|$amount";
		$queryRequest33 = http_build_query(array('queryRequest' => $queryRequest, "aggregatorId" => "SBIEPAY", "merchantId" => $merchantid));
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_SSLVERSION, true);
		curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($ch, CURLOPT_TIMEOUT, 60);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $queryRequest33);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
		$response = curl_exec($ch);
		if (curl_errno($ch)) {
			curl_close($ch);
			return response()->json(["message" => "Failed to verify payment.", "data" => curl_error($ch)], 400);
		}
		curl_close($ch);
		// $str = explode("|", $response);
		return response()->json(["message" => "Payment fetched successfully.", "data" => $response], 200);
	}
}
