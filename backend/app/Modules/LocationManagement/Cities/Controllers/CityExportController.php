<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Services\CityService;

class CityExportController extends Controller
{
    public function __construct(private CityService $cityService){}

    public function index(){
        return $this->cityService->excel()->toBrowser();
    }
}
