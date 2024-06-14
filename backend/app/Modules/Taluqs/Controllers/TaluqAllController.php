<?php

namespace App\Modules\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Taluqs\Resources\TaluqCollection;
use App\Modules\Taluqs\Services\TaluqService;

class TaluqAllController extends Controller
{
    private $taluqService;

    public function __construct(TaluqService $taluqService)
    {
        $this->taluqService = $taluqService;
    }

    public function index(){
        $taluq = $this->taluqService->all();
        return response()->json(["message" => "Taluq fetched successfully.", "data" => TaluqCollection::collection($taluq)], 200);
    }
}