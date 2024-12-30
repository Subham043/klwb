<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\States\Resources\StateCollection;
use App\Modules\LocationManagement\States\Services\StateService;

class StateDeleteController extends Controller
{
    public function __construct(private StateService $stateService){}

    /**
     * Delete a state.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $state = $this->stateService->getById($id);

        try {
            //code...
            $this->stateService->delete(
                $state
            );
            return response()->json(["message" => "State deleted successfully.", "data" => StateCollection::make($state)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
