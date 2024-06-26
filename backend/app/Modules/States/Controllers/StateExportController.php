<?php

namespace App\Modules\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\States\Exports\StateExport;
use Maatwebsite\Excel\Facades\Excel;

class StateExportController extends Controller
{
    public function index(){
        return Excel::download(new StateExport, 'states.xlsx');
    }
}