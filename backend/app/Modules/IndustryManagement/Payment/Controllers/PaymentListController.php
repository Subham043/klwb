<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;
use App\Modules\IndustryManagement\Payment\Resources\PaymentCollection;

class PaymentListController extends Controller
{
    public function __construct(private PaymentService $paymentService){}

    public function index(){
        $application = $this->paymentService->getList();
        return PaymentCollection::collection($application);
    }
}
