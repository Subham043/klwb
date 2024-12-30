<?php

namespace App\Modules\Admins\RegisteredIndustryContribution\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustryContribution\Resources\RegisteredIndustryContributionCollection;
use App\Modules\Admins\RegisteredIndustryContribution\Services\RegisteredIndustryContributionService;

class RegisteredIndustryContributionVerifyController extends Controller
{

    public function __construct(private RegisteredIndustryContributionService $contributionService){}
    
    public function index($reg_industry_id, $id){
        $payment = $this->contributionService->getById($reg_industry_id, $id);
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
        return response()->json(["message" => "Payment fetched successfully.", "data" => RegisteredIndustryContributionCollection::make($payment)], 200);
    }
}
