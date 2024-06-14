<?php

namespace App\Modules\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Cities\Requests\CityRequest;
use App\Modules\Cities\Resources\CityCollection;
use App\Modules\Cities\Services\CityService;

class CityCreateController extends Controller
{
    private $cityService;

    public function __construct(CityService $cityService)
    {
        $this->cityService = $cityService;
    }

    public function index(CityRequest $request){
        try {
            //code...
            $city = $this->cityService->create(
                $request->validated()
            );
            return response()->json(["message" => "City created successfully.", "data" => CityCollection::make($city)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}