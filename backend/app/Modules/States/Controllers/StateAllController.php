<?php

namespace App\Modules\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\States\Resources\StateCollection;
use App\Modules\States\Services\StateService;

class StateAllController extends Controller
{
    private $stateService;

    public function __construct(StateService $stateService)
    {
        $this->stateService = $stateService;
    }

    public function index(){
        $state = $this->stateService->all();
        return response()->json(["message" => "State fetched successfully.", "data" => StateCollection::collection($state)], 200);
    }
}