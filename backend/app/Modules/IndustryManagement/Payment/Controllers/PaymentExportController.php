<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;

class PaymentExportController extends Controller
{
    public function __construct(private PaymentService $paymentService){}

    public function index(){
        return $this->paymentService->excel()->toBrowser();
    }
}
