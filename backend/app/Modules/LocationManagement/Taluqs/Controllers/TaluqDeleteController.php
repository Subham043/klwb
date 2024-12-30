<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Resources\TaluqCollection;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;

class TaluqDeleteController extends Controller
{
    public function __construct(private TaluqService $taluqService){}

    /**
     * Delete a Taluq by id
     * 
     * @param int $id
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $taluq = $this->taluqService->getById($id);

        try {
            //code...
            $this->taluqService->delete(
                $taluq
            );
            return response()->json(["message" => "Taluq deleted successfully.", "data" => TaluqCollection::make($taluq)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
