<?php

namespace App\Modules\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Taluqs\Resources\TaluqCollection;
use App\Modules\Taluqs\Services\TaluqService;
use Illuminate\Http\Request;

class TaluqPaginateController extends Controller
{
    private $taluqService;

    public function __construct(TaluqService $taluqService)
    {
        $this->taluqService = $taluqService;
    }

    public function index(Request $request){
        $data = $this->taluqService->paginate($request->total ?? 10);
        return TaluqCollection::collection($data);
    }

}