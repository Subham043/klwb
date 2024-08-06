<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RequestInstitutes\Exports\RequestInstituteExport;
use Maatwebsite\Excel\Facades\Excel;

class RequestInstituteExportController extends Controller
{
    public function index(){
        return Excel::download(new RequestInstituteExport, 'institutes.xlsx');
    }
}
