<?php

namespace App\Modules\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationDates\Exports\ApplicationDateExport;
use Maatwebsite\Excel\Facades\Excel;

class ApplicationDateExportController extends Controller
{
    public function index(){
        return Excel::download(new ApplicationDateExport, 'application_dates.xlsx');
    }
}