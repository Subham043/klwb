<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Resources\TaluqCollection;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;
use Illuminate\Http\Request;

class TaluqPaginateController extends Controller
{

    public function __construct(private TaluqService $taluqService){}

/**
 * Paginate the Taluqs.
 *
 * @param \Illuminate\Http\Request $request
 * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
 */

    public function index(Request $request){
        $data = $this->taluqService->paginate($request->total ?? 10);
        return TaluqCollection::collection($data);
    }

}
