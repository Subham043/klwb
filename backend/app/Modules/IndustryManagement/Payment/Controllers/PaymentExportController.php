<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;

class PaymentExportController extends Controller
{
    public function __construct(private PaymentService $paymentService){}

    /**
     * Download an Excel file containing all payments.
     *
     * @return \Spatie\SimpleExcel\SimpleExcelWriter
     */
    public function index(){
        return $this->paymentService->excel()->toBrowser();
    }
}
