<?php

namespace App\Modules\PaymentOfficer\Contribution\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\NumberToWordService;
use App\Modules\PaymentOfficer\Contribution\Services\ContributionService;
use Barryvdh\DomPDF\Facade\Pdf;

class ContributionRecieptPdfController extends Controller
{

    public function __construct(private ContributionService $paymentService){}

    /**
     * Downloads a PDF receipt for a payment.
     * 
     * @param int $id The ID of the payment.
     * @return \Illuminate\Http\Response
     */
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
