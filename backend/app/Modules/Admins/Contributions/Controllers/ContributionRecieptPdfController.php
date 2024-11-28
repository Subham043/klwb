<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\NumberToWordService;
use App\Modules\Admins\Contributions\Services\ContributionService;
use Barryvdh\DomPDF\Facade\Pdf;

class ContributionRecieptPdfController extends Controller
{

    public function __construct(private ContributionService $paymentService){}

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
