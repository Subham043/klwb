<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;

class PaymentPaidYearController extends Controller
{

    public function __construct(private PaymentService $paymentService){}

    /**
     * Fetch all paid years.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(){
        $years = $this->paymentService->getPaidYears();
        return response()->json(["message" => "Payment years fetched successfully.", "data" => $years], 200);
    }
}
