<?php

namespace App\Modules\IndustryManagement\Payment\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\IndustryManagement\Payment\Exports\PaymentExport;
use App\Modules\IndustryManagement\Payment\Services\PaymentService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class PaymentExportController extends Controller
{
    public function __construct(private PaymentService $paymentService){}

    /**
     * Download an Excel file containing all payments.
     *
     * @return \Spatie\SimpleExcel\SimpleExcelWriter
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Industry->value())->user()->current_role == Roles::Industry->value()) ? Excel::download(new PaymentExport($this->paymentService->getExcelQuery()), 'payments.xlsx') : abort(403);
        // return Excel::download(new PaymentExport($this->paymentService->getExcelQuery()), 'payments.xlsx');
    }
}
