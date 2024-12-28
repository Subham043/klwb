<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Payment\Resources\PaymentCollection;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;

class PaymentStatusController extends Controller
{

    public function __construct(private PaymentService $paymentService){}

    /**
     * Fetch a payment by ID.
     * 
     * @param int $id The ID of the payment.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $payment = $this->paymentService->getById($id);
        return response()->json(["message" => "Payment fetched successfully.", "data" => PaymentCollection::make($payment)], 200);
    }
}
