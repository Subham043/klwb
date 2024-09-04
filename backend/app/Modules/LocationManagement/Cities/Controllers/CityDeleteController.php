<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Resources\CityCollection;
use App\Modules\LocationManagement\Cities\Services\CityService;

class CityDeleteController extends Controller
{
    public function __construct(private CityService $cityService){}

    public function index($id){
        $city = $this->cityService->getById($id);

        try {
            //code...
            $this->cityService->delete(
                $city
            );
            return response()->json(["message" => "City deleted successfully.", "data" => CityCollection::make($city)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
