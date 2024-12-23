<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Requests\TaluqRequest;
use App\Modules\LocationManagement\Taluqs\Resources\TaluqCollection;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;

class TaluqCreateController extends Controller
{
    public function __construct(private TaluqService $taluqService){}

    /**
     * Handle the creation of a new Taluq.
     *
     * @param TaluqRequest $request The request instance containing the validated data for creating a Taluq.
     * 
     * @return \Illuminate\Http\JsonResponse A JSON response indicating the success or failure of the creation process.
     */

    public function index(TaluqRequest $request){
        try {
            //code...
            $taluq = $this->taluqService->create(
                [...$request->validated(), 'is_active' => 1]
            );
            return response()->json(["message" => "Taluq created successfully.", "data" => TaluqCollection::make($taluq)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
