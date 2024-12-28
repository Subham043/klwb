<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\AESEncDecService;
use App\Modules\IndustryManagement\Payment\Resources\PaymentCollection;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;
use Illuminate\Http\Request;

class SBIPaymentVerifyController extends Controller
{

    public function __construct(private PaymentService $paymentService){}

    /**
     * Return the view to make payment through SBI.
     *
     * @param int $id The id of the pending payment.
     * @return \Illuminate\Contracts\View\View
     */
    public function success(Request $request, $id){
        $payment = $this->paymentService->getPaymentPendingById($id);
        try {
            //code...
            if (!empty($request->encData)){
                $encData = (new AESEncDecService)->decrypt($request->encData,config('services.sbi.key'));
                $str = explode("|",$encData);
                if (!empty($str[2]) && $str[2] === 'SUCCESS') {
                    $payment->update([
                        'status' => 1,
                        'transaction_status' => $encData,
                        'atrn' => $str[1],
                    ]);
                }
            }elseif (!empty($request->pushRespData)){
                $resdata = (new AESEncDecService)->decrypt($request->pushRespData,config('services.sbi.key'));
                $strs = explode("|",$resdata);
                if (!empty($strs[2]) && $strs[2] === 'SUCCESS') {
                    $payment->update([
                        'status' => 1,
                        'transaction_status' => $resdata,
                        'atrn' => $strs[1],
                    ]);
                }
            }
            return redirect(config('app.client_url').'/industry/payment/status/'.$id);
        } catch (\Throwable $th) {
            //throw $th;
            return redirect(config('app.client_url').'/industry/payment/status/'.$id);
        }
    }
    
    
    public function fail(Request $request, $id){
        $payment = $this->paymentService->getPaymentPendingById($id);
        try {
            //code...
            if (!empty($request->encData)){
                $encData = (new AESEncDecService)->decrypt($request->encData,config('services.sbi.key'));
                $str = explode("|",$encData);
                if (!empty($str[2]) && $str[2] === 'FAIL') {
                    $payment->update([
                        'status' => 2,
                        'transaction_status' => $encData,
                    ]);
                }
            }elseif (!empty($request->pushRespData)){
                $resdata = (new AESEncDecService)->decrypt($request->pushRespData,config('services.sbi.key'));
                $strs = explode("|",$resdata);
                if (!empty($strs[2]) && $strs[2] === 'FAIL') {
                    $payment->update([
                        'status' => 2,
                        'transaction_status' => $resdata,
                    ]);
                }
            }
            return redirect(config('app.client_url').'/industry/payment/status/'.$id);
        } catch (\Throwable $th) {
            //throw $th;
            return redirect(config('app.client_url').'/industry/payment/status/'.$id);
        }
    }
    
    public function doubleVerify($id){
        $payment = $this->paymentService->getById($id);
        $merchant_order_no=$payment->pay_id; // merchant order no
        $merchantid=config('services.sbi.id');  //merchant id
        $amount=$payment->price; // amount
        $url=config('services.sbi.verify_url'); // double verification url
        $queryRequest="|$merchantid| $merchant_order_no|$amount";
        $queryRequest33=http_build_query(array('queryRequest' => $queryRequest,"aggregatorId"=>"SBIEPAY","merchantId"=>$merchantid));
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_SSLVERSION, true);
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch,CURLOPT_POSTFIELDS, $queryRequest33);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        $response = curl_exec ($ch);
        if (curl_errno($ch)) {
            // echo $error_msg = curl_error($ch);
            curl_close ($ch);
            return response()->json(["message" => "Payment fetched successfully.", "data" => curl_error($ch)], 400);
        }
        curl_close ($ch);
        $str = explode("|",$response);
        if (!empty($str[2]) && $str[2] === 'SUCCESS' && $payment->status != 1) {
            $payment->update([
                'status' => 1,
                'transaction_status' => $response,
                'atrn' => $str[1],
            ]);
        }
        return response()->json(["message" => "Payment fetched successfully.", "data" => PaymentCollection::make($payment)], 200);
    }
}
