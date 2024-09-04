<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Resources\TaluqCollection;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;

class TaluqAllController extends Controller
{
    public function __construct(private TaluqService $taluqService){}

    public function index(){
        $taluq = $this->taluqService->all();
        return response()->json(["message" => "Taluq fetched successfully.", "data" => TaluqCollection::collection($taluq)], 200);
    }
}
