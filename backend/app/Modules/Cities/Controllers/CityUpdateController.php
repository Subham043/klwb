<?php

namespace App\Modules\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Cities\Requests\CityRequest;
use App\Modules\Cities\Resources\CityCollection;
use App\Modules\Cities\Services\CityService;

class CityUpdateController extends Controller
{
    private $cityService;

    public function __construct(CityService $cityService)
    {
        $this->cityService = $cityService;
    }

    public function index(CityRequest $request, $id){
        $city = $this->cityService->getById($id);
        try {
            //code...
            $this->cityService->update(
                $request->validated(),
                $city
            );
            return response()->json(["message" => "City updated successfully.", "data" => CityCollection::make($city)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}