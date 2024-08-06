<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Exports\CityExport;
use Maatwebsite\Excel\Facades\Excel;

class CityExportController extends Controller
{
    public function index(){
        return Excel::download(new CityExport, 'cities.xlsx');
    }
}
