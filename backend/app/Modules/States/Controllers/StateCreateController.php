<?php

namespace App\Modules\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\States\Requests\StateRequest;
use App\Modules\States\Resources\StateCollection;
use App\Modules\States\Services\StateService;

class StateCreateController extends Controller
{
    private $stateService;

    public function __construct(StateService $stateService)
    {
        $this->stateService = $stateService;
    }

    public function index(StateRequest $request){
        try {
            //code...
            $state = $this->stateService->create(
                $request->validated()
            );
            return response()->json(["message" => "State created successfully.", "data" => StateCollection::make($state)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}