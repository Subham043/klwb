<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\LocationManagement\States\Resources\StateCollection;
use App\Modules\LocationManagement\States\Services\StateService;

class StateToggleController extends Controller
{
    public function __construct(private StateService $stateService){}

    /**
     * Toggle the status of a state
     * 
     * @param ToggleStatusRequest $request
     * @param int $id
     * 
     * @response 200 {
     *   "message": "State unblocked successfully.",
     *   "data": {
     *     "id": 1,
     *     "name": "Andhra Pradesh"
     *   }
     * }
     * 
     * @response 200 {
     *   "message": "State blocked successfully.",
     *   "data": {
     *     "id": 1,
     *     "name": "Andhra Pradesh"
     *   }
     * }
     * 
     * @response 400 {
     *   "message": "Something went wrong. Please try again"
     * }
     */
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
