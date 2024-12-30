<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\States\Requests\StateRequest;
use App\Modules\LocationManagement\States\Resources\StateCollection;
use App\Modules\LocationManagement\States\Services\StateService;

class StateUpdateController extends Controller
{
    public function __construct(private StateService $stateService){}

/**
 * Update a state's details.
 *
 * @param StateRequest $request The request object containing the updated state data.
 * @param int $id The ID of the state to be updated.
 * 
 * @return \Illuminate\Http\JsonResponse
 * 
 * @response 200 {
 *   "message": "State updated successfully.",
 *   "data": {
 *     // State data
 *   }
 * }
 * 
 * @response 400 {
 *   "message": "Something went wrong. Please try again"
 * }
 */

    public function index(StateRequest $request, $id){
        $state = $this->stateService->getById($id);
        try {
            //code...
            $this->stateService->update(
                $request->validated(),
                $state
            );
            return response()->json(["message" => "State updated successfully.", "data" => StateCollection::make($state)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
