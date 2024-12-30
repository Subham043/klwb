<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Resources\CityCollection;
use App\Modules\LocationManagement\Cities\Services\CityService;

class CityViewController extends Controller
{
    public function __construct(private CityService $cityService){}

    /**
     * Get a city by its id.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $city = $this->cityService->getById($id);
        return response()->json(["message" => "City fetched successfully.", "data" => CityCollection::make($city)], 200);
    }
}
