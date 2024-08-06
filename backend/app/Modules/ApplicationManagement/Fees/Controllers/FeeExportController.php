<?php

namespace App\Modules\ApplicationManagement\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Fees\Exports\FeeExport;
use Maatwebsite\Excel\Facades\Excel;

class FeeExportController extends Controller
{
    public function index(){
        return Excel::download(new FeeExport, 'fees.xlsx');
    }
}
