<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\RegisteredInstitutes\Exports\RegisteredInstituteExport;
use Maatwebsite\Excel\Facades\Excel;

class RegisteredInstituteExportController extends Controller
{
    public function index(){
        return Excel::download(new RegisteredInstituteExport, 'institutes.xlsx');
    }
}
