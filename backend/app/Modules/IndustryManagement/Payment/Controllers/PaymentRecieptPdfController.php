<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\NumberToWordService;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;
use Barryvdh\DomPDF\Facade\Pdf;

class PaymentRecieptPdfController extends Controller
{

    public function __construct(private PaymentService $paymentService){}

    public function index($id){
        $payment = $this->paymentService->getPaymentCompletedById($id);
        $fileName = str()->uuid();
        $data = [
            'payment' => $payment,
            'price_word' => (new NumberToWordService)->convert($payment->price)
        ];
        $pdf = Pdf::setOption([
            'defaultFont' => '"Noto Serif Kannada", "Open Sans", sans-serif', 
            'isPhpEnabled' => true, 
            'isRemoteEnabled' => true, 
        ])->setPaper('a4', 'potrait')->loadView('pdf.industry_reciept', $data);
        return $pdf->download($fileName.'.pdf');
    }
}
