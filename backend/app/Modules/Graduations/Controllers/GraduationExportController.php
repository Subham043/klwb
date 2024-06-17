<?php

namespace App\Modules\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Graduations\Exports\GraduationExport;
use Maatwebsite\Excel\Facades\Excel;

class GraduationExportController extends Controller
{
    public function index(){
        return Excel::download(new GraduationExport, 'graduations.xlsx');
    }
}