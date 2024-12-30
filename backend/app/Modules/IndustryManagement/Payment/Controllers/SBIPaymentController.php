<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\AESEncDecService;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;

class SBIPaymentController extends Controller
{

    public function __construct(private PaymentService $paymentService){}

    /**
     * Return the view to make payment through SBI.
     *
     * @param int $id The id of the pending payment.
     * @return \Illuminate\Contracts\View\View
     */
    public function index($id){
        $payment = $this->paymentService->getPaymentPendingById($id);
        $payload = config('services.sbi.id')."|DOM|IN|INR|".$payment->price."|".$payment->year."|".route("sbi_success_callback", $payment->id)."|".route("sbi_failure_callback", $payment->id)."|SBIEPAY|".$payment->pay_id."|".$payment->comp_regd_id."|NB|ONLINE|ONLINE";
        $EncryptTrans = (new AESEncDecService)->encrypt($payload, config('services.sbi.key'));
        return view("payment")->with([
            "EncryptTrans" => str_replace("\n"," ",$EncryptTrans),
            'merchantId' => config('services.sbi.id'),
            'payment_url' => config('services.sbi.payment_url')
        ]);
    }
}
