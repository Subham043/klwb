<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\LocationManagement\States\Resources\StateCollection;
use App\Modules\LocationManagement\States\Services\StateService;

class StateToggleController extends Controller
{
    public function __construct(private StateService $stateService){}

    public function index(ToggleStatusRequest $request, $id){
        $state = $this->stateService->getById($id);
        try {
            //code...
            $this->stateService->toggleStatus($state);
            if($state->is_active){
                return response()->json(["message" => "State unblocked successfully.", "data" => StateCollection::make($state)], 200);
            }
            return response()->json(["message" => "State blocked successfully.", "data" => StateCollection::make($state)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
