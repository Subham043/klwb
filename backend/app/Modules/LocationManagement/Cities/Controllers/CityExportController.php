<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Exports\CityExport;
use App\Modules\LocationManagement\Cities\Services\CityService;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class CityExportController extends Controller
{
    private $cityService;

    public function __construct(CityService $cityService)
    {
        $this->cityService = $cityService;
    }

    public function index(Request $request){
        $data = $this->cityService->all($request->state_id ?? null);
        return Excel::download(new CityExport($data), 'cities.xlsx');
    }
}
