<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\LocationManagement\Cities\Services\CityService;
use App\Modules\LocationManagement\Cities\Exports\CityExport;
use App\Modules\Roles\Enums\Roles;
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
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new CityExport($this->cityService->getExcelQuery()), 'districts.xlsx') : abort(403);
        // return Excel::download(new CityExport($this->cityService->getExcelQuery()), 'districts.xlsx');
    }
}
