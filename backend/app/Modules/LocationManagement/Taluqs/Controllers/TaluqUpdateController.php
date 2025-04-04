<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Requests\TaluqRequest;
use App\Modules\LocationManagement\Taluqs\Resources\TaluqCollection;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;

class TaluqUpdateController extends Controller
{
    public function __construct(private TaluqService $taluqService){}

    /**
     * Update a Taluq by id
     * 
     * @param \App\Modules\LocationManagement\Taluqs\Requests\TaluqRequest $request
     * @param int $id
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(TaluqRequest $request, $id){
        $taluq = $this->taluqService->getById($id);
        try {
            //code...
            $this->taluqService->update(
                $request->validated(),
                $taluq
            );
            return response()->json(["message" => "Taluq updated successfully.", "data" => TaluqCollection::make($taluq)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
