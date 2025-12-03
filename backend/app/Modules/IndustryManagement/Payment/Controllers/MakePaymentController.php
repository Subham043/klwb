<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\IndustryManagement\Payment\Events\IndustryPaymentCompleted;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use App\Modules\IndustryManagement\Payment\Requests\PaymentRequest;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;
use Illuminate\Support\Facades\DB;

class MakePaymentController extends Controller
{

    public function __construct(private PaymentService $paymentService){}

    /**
     * Create a new payment.
     *
     * @OA\Post(
     *     path="/industry/payment/make",
     *     summary="Make payment",
     *     tags={"Industry Management"},
     *     security={{"bearer_token":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/PaymentRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Payment fetched successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(
     *                 property="message",
     *                 type="string",
     *                 example="Payment fetched successfully"
     *             ),
     *             @OA\Property(
     *                 property="data",
     *                 type="string",
     *                 example="http://127.0.0.1:8000/api/industry/payment/make"
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Something went wrong. Please try again"
     *     )
     * )
     */
    public function index(PaymentRequest $request){
        $data = Payment::with('industry')->whereHas('industry', function ($query) {
			$query->where('id', auth()->guard(Guards::Industry->value())->user()->reg_industry_id);
		})
		->where('comp_regd_id', auth()->guard(Guards::Industry->value())->user()->reg_industry_id)
        // ->where('status', 1)
        ->where('year', $request->year)
        ->first();

        if($data && $data->status == 1){
            return response()->json(["message" => "You have already paid for the selected year."], 400);
        }

        if($data && $data->status != 1 && $this->doubleVerify($data)){
            return response()->json(["message" => "You have already paid for the selected year."], 400);
        }

        $total_employees = (int)$request->male + (int)$request->female;

        if($request->act =='1' && ($total_employees < 50)){
            return response()->json(["message" => "Minimum 50 employees are required to make payment."], 400);
        }elseif($request->act =='2' && ($total_employees < 10)){
            return response()->json(["message" => "Minimum 10 employees are required to make payment."], 400);
        }elseif($request->act =='3' && ($total_employees < 50)){
            return response()->json(["message" => "Minimum 50 employees are required to make payment."], 400);
        }elseif($request->act =='4' && ($total_employees < 20)){
            return response()->json(["message" => "Minimum 20 employees are required to make payment."], 400);
        }

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

    public function doubleVerify(Payment $payment){
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
            return false;
        }
        curl_close ($ch);
        $str = explode("|",$response);
        if (!empty($str[2]) && $str[2] === 'SUCCESS' && $payment->status != 1) {
            $payment->update([
                'status' => 1,
                'transaction_status' => $response,
                'atrn' => $str[1],
            ]);
            IndustryPaymentCompleted::dispatch($payment);
            return true;
        }
        return false;
    }
}
