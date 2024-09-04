<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\States\Resources\StateCollection;
use App\Modules\LocationManagement\States\Services\StateService;

class StateAllController extends Controller
{
    public function __construct(private StateService $stateService){}

    public function index(){
        $state = $this->stateService->all();
        return response()->json(["message" => "State fetched successfully.", "data" => StateCollection::collection($state)], 200);
    }
}
