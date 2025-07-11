<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Fees\Exports\FeeExport;
use App\Modules\Admins\Fees\Services\FeeService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class FeeExportController extends Controller
{
    public function __construct(private FeeService $feeService){}

    /**
     * Exports fees data to an Excel file and sends it to the browser for download.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */

    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new FeeExport($this->feeService->getExcelQuery()), 'fees.xlsx') : abort(403);
        // return Excel::download(new FeeExport($this->feeService->getExcelQuery()), 'fees.xlsx');
    }
}
