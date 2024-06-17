<?php

namespace App\Modules\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Cities\Exports\CityExport;
use Maatwebsite\Excel\Facades\Excel;

class CityExportController extends Controller
{
    public function index(){
        return Excel::download(new CityExport, 'cities.xlsx');
    }
}
