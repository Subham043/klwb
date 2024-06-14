<?php

namespace App\Modules\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\States\Resources\StateCollection;
use App\Modules\States\Services\StateService;
use Illuminate\Http\Request;

class StatePaginateController extends Controller
{
    private $stateService;

    public function __construct(StateService $stateService)
    {
        $this->stateService = $stateService;
    }

    public function index(Request $request){
        $data = $this->stateService->paginate($request->total ?? 10);
        return StateCollection::collection($data);
    }

}