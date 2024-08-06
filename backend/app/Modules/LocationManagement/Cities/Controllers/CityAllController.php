<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Resources\CityCollection;
use App\Modules\LocationManagement\Cities\Services\CityService;
use Illuminate\Http\Request;

class CityAllController extends Controller
{
    private $cityService;

    public function __construct(CityService $cityService)
    {
        $this->cityService = $cityService;
    }

    public function index(Request $request){
        $city = $this->cityService->all($request->state_id ?? null);
        return response()->json(["message" => "City fetched successfully.", "data" => CityCollection::collection($city)], 200);
    }
}
