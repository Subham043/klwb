<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Requests\CityRequest;
use App\Modules\LocationManagement\Cities\Resources\CityCollection;
use App\Modules\LocationManagement\Cities\Services\CityService;

class CityCreateController extends Controller
{
    public function __construct(private CityService $cityService){}

    /**
     * Store a newly created City in storage.
     *
     * @param  \App\Modules\LocationManagement\Cities\Requests\CityRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function index(CityRequest $request){
        try {
            //code...
            $city = $this->cityService->create(
                [
                    ...$request->validated(),
                    'special_name' => $request->special_name ?? $request->name, 
                    'is_active' => 1
                ]
            );
            return response()->json(["message" => "City created successfully.", "data" => CityCollection::make($city)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
