<?php

namespace App\Modules\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Taluqs\Requests\TaluqRequest;
use App\Modules\Taluqs\Resources\TaluqCollection;
use App\Modules\Taluqs\Services\TaluqService;

class TaluqCreateController extends Controller
{
    private $taluqService;

    public function __construct(TaluqService $taluqService)
    {
        $this->taluqService = $taluqService;
    }

    public function index(TaluqRequest $request){
        try {
            //code...
            $taluq = $this->taluqService->create(
                $request->validated()
            );
            return response()->json(["message" => "Taluq created successfully.", "data" => TaluqCollection::make($taluq)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}