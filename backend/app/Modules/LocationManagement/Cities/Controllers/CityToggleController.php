<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\LocationManagement\Cities\Resources\CityCollection;
use App\Modules\LocationManagement\Cities\Services\CityService;

class CityToggleController extends Controller
{
    public function __construct(private CityService $cityService){}

    /**
     * Toggle the status of the city.
     *
     * @param ToggleStatusRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ToggleStatusRequest $request, $id){
        $city = $this->cityService->getById($id);
        try {
            //code...
            $this->cityService->toggleStatus($city);
            if($city->is_active){
                return response()->json(["message" => "City unblocked successfully.", "data" => CityCollection::make($city)], 200);
            }
            return response()->json(["message" => "City blocked successfully.", "data" => CityCollection::make($city)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
