<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Resources\TaluqCollection;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;
use Illuminate\Http\Request;

class TaluqAllController extends Controller
{
    private $taluqService;

    public function __construct(TaluqService $taluqService)
    {
        $this->taluqService = $taluqService;
    }

    public function index(Request $request){
        $taluq = $this->taluqService->all($request->city_id ?? null);
        return response()->json(["message" => "Taluq fetched successfully.", "data" => TaluqCollection::collection($taluq)], 200);
    }
}
