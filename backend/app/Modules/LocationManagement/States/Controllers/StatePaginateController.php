<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\States\Resources\StateCollection;
use App\Modules\LocationManagement\States\Services\StateService;
use Illuminate\Http\Request;

class StatePaginateController extends Controller
{
    public function __construct(private StateService $stateService){}

    public function index(Request $request){
        $data = $this->stateService->paginate($request->total ?? 10);
        return StateCollection::collection($data);
    }

}
