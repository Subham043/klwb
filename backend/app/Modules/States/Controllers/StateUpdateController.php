<?php

namespace App\Modules\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\States\Requests\StateRequest;
use App\Modules\States\Resources\StateCollection;
use App\Modules\States\Services\StateService;

class StateUpdateController extends Controller
{
    private $stateService;

    public function __construct(StateService $stateService)
    {
        $this->stateService = $stateService;
    }

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