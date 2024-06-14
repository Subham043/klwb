<?php

namespace App\Modules\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\States\Resources\StateCollection;
use App\Modules\States\Services\StateService;

class StateViewController extends Controller
{
    private $stateService;

    public function __construct(StateService $stateService)
    {
        $this->stateService = $stateService;
    }

    public function index($id){
        $state = $this->stateService->getById($id);
        return response()->json(["message" => "State fetched successfully.", "data" => StateCollection::make($state)], 200);
    }
}