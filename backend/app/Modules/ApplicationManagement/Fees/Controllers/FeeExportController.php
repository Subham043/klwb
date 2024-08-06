<?php

namespace App\Modules\ApplicationManagement\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Fees\Exports\FeeExport;
use App\Modules\ApplicationManagement\Fees\Services\FeeService;
use Maatwebsite\Excel\Facades\Excel;

class FeeExportController extends Controller
{
    private $feeService;

    public function __construct(FeeService $feeService)
    {
        $this->feeService = $feeService;
    }

    public function index(){
        $data = $this->feeService->all();
        return Excel::download(new FeeExport($data), 'fees.xlsx');
    }
}
