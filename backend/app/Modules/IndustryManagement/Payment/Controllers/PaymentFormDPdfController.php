<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;
use Barryvdh\DomPDF\Facade\Pdf;

class PaymentFormDPdfController extends Controller
{

    public function __construct(private PaymentService $paymentService){}

    public function index($id){
        $payment = $this->paymentService->getPaymentCompletedById($id);
        $fileName = str()->uuid();
        $data = [
            'payment' => $payment,
            'auth' => auth(Guards::Industry->value())->user(),
        ];
        $pdf = Pdf::setOption([
            'defaultFont' => '"Noto Serif Kannada", "Open Sans", sans-serif', 
            'isPhpEnabled' => true, 
            'isRemoteEnabled' => true, 
        ])->setPaper('a4', 'potrait')->loadView('pdf.industry_formd', $data);
        return $pdf->download($fileName.'.pdf');
    }
}
