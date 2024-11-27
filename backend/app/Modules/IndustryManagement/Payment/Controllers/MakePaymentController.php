<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Payment\Requests\PaymentRequest;
use App\Modules\IndustryManagement\Payment\Resources\PaymentCollection;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;
use Illuminate\Support\Facades\DB;

class MakePaymentController extends Controller
{

    public function __construct(private PaymentService $paymentService){}

    public function index(PaymentRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $request->validated();
            $payment = $this->paymentService->makePayment($request);
            return response()->json(["message" => "Payment fetched successfully.", "data" => route('sbi_make_payment', $payment->id)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            // throw $th;
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}