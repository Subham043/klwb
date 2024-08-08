<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Exports\CityExport;
use App\Modules\LocationManagement\Cities\Services\CityService;
use Maatwebsite\Excel\Facades\Excel;

class CityExportController extends Controller
{
    private $cityService;

    public function __construct(CityService $cityService)
    {
        $this->cityService = $cityService;
    }

    public function index(){
        $data = $this->cityService->all();
        return Excel::download(new CityExport($data), 'cities.xlsx');
    }
}
