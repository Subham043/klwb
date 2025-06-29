<?php

namespace App\Modules\LocationManagement\Cities\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Cities\Requests\CityRequest;
use App\Modules\LocationManagement\Cities\Resources\CityCollection;
use App\Modules\LocationManagement\Cities\Services\CityService;

class CityUpdateController extends Controller
{
    public function __construct(private CityService $cityService){}

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Modules\LocationManagement\Cities\Requests\CityRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index(CityRequest $request, $id){
        $city = $this->cityService->getById($id);
        try {
            //code...
            $this->cityService->update(
                [
                    ...$request->validated(),
                    'special_name' => $request->special_name ?? $request->name, 
                ],
                $city
            );
            return response()->json(["message" => "City updated successfully.", "data" => CityCollection::make($city)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
