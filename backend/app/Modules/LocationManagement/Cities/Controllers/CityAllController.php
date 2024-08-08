<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Resources\CityCollection;
use App\Modules\LocationManagement\Cities\Services\CityService;

class CityAllController extends Controller
{
    private $cityService;

    public function __construct(CityService $cityService)
    {
        $this->cityService = $cityService;
    }

    public function index(){
        $city = $this->cityService->all();
        return response()->json(["message" => "City fetched successfully.", "data" => CityCollection::collection($city)], 200);
    }
}
