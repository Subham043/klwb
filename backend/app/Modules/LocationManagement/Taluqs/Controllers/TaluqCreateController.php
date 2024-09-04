<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Requests\TaluqRequest;
use App\Modules\LocationManagement\Taluqs\Resources\TaluqCollection;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;

class TaluqCreateController extends Controller
{
    public function __construct(private TaluqService $taluqService){}

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
