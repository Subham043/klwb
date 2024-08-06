<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Exports\TaluqExport;
use Maatwebsite\Excel\Facades\Excel;

class TaluqExportController extends Controller
{
    public function index(){
        return Excel::download(new TaluqExport, 'taluqs.xlsx');
    }
}
