<?php

namespace App\Modules\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Taluqs\Resources\TaluqCollection;
use App\Modules\Taluqs\Services\TaluqService;

class TaluqViewController extends Controller
{
    private $taluqService;

    public function __construct(TaluqService $taluqService)
    {
        $this->taluqService = $taluqService;
    }

    public function index($id){
        $taluq = $this->taluqService->getById($id);
        return response()->json(["message" => "Taluq fetched successfully.", "data" => TaluqCollection::make($taluq)], 200);
    }
}