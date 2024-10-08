<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\States\Resources\StateCollection;
use App\Modules\LocationManagement\States\Services\StateService;

class StateViewController extends Controller
{
    public function __construct(private StateService $stateService){}

    public function index($id){
        $state = $this->stateService->getById($id);
        return response()->json(["message" => "State fetched successfully.", "data" => StateCollection::make($state)], 200);
    }
}
