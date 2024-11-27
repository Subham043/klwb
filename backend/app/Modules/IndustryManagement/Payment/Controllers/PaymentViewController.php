<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Payment\Resources\PaymentCollection;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;

class PaymentViewController extends Controller
{

    public function __construct(private PaymentService $paymentService){}

    public function index($id){
        $payment = $this->paymentService->getPaymentCompletedById($id);
        return response()->json(["message" => "Payment fetched successfully.", "data" => PaymentCollection::make($payment)], 200);
    }
}
