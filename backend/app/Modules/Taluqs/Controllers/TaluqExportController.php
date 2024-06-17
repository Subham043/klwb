<?php

namespace App\Modules\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Taluqs\Exports\TaluqExport;
use Maatwebsite\Excel\Facades\Excel;

class TaluqExportController extends Controller
{
    public function index(){
        return Excel::download(new TaluqExport, 'taluqs.xlsx');
    }
}