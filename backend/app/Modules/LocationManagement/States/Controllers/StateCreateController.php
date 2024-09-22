<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\States\Requests\StateRequest;
use App\Modules\LocationManagement\States\Resources\StateCollection;
use App\Modules\LocationManagement\States\Services\StateService;

class StateCreateController extends Controller
{
    public function __construct(private StateService $stateService){}

    public function index(StateRequest $request){
        try {
            //code...
            $state = $this->stateService->create(
                [...$request->validated(), 'is_active' => 1]
            );
            return response()->json(["message" => "State created successfully.", "data" => StateCollection::make($state)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
