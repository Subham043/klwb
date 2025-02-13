<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Services\CityService;
use App\Modules\LocationManagement\Exports\CityExport;
use Maatwebsite\Excel\Facades\Excel;

class CityExportController extends Controller
{
    public function __construct(private CityService $cityService){}

    /**
     * Download all cities in excel format
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new CityExport($this->cityService->getExcelQuery()), 'districts.xlsx');
    }
}
