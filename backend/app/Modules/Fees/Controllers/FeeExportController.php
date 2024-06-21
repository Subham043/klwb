<?php

namespace App\Modules\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Fees\Exports\FeeExport;
use Maatwebsite\Excel\Facades\Excel;

class FeeExportController extends Controller
{
    public function index(){
        return Excel::download(new FeeExport, 'fees.xlsx');
    }
}