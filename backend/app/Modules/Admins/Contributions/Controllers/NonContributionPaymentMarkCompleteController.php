<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Requests\NonContributionPaymentCompleteRequest;
use App\Modules\Admins\Contributions\Services\NonContributionPaymentService;
use App\Modules\IndustryManagement\Payment\Models\Payment;

class NonContributionPaymentMarkCompleteController extends Controller
{
    public function __construct(private NonContributionPaymentService $contributionService){}

    /**
     * Show the list of contributions.
     *
     * @param  \Illuminate\Http\NonContributionPaymentCompleteRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function index(NonContributionPaymentCompleteRequest $request, $comp_regd_id, $id){
        $data = Payment::with('industry')->whereHas('industry', function ($query) use ($comp_regd_id) {
			$query->where('id', $comp_regd_id);
		})
		->where('comp_regd_id', $comp_regd_id)
        ->where('status', 1)
        ->where('year', $request->year)
        ->first();

        if($data){
            return response()->json(["message" => "This industry has already paid for the selected year."], 400);
        }

        $payment = Payment::with('industry')->whereHas('industry', function ($query) use ($comp_regd_id) {
			$query->where('id', $comp_regd_id);
		})
		->where('comp_regd_id', $comp_regd_id)
        ->where('id', $id)
        ->where('status', '!=', 1)
        ->where('year', $request->year)
        ->firstOrFail();

        $payment->status = 1;
        $payment->resolved = 1;
        $payment->save();

        return response()->json(["message" => "Payment marked as complete successfully"], 200);
    }

}
