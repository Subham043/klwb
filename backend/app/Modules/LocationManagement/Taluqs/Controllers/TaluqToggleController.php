<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\LocationManagement\Taluqs\Resources\TaluqCollection;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;

class TaluqToggleController extends Controller
{
    public function __construct(private TaluqService $taluqService){}

    public function index(ToggleStatusRequest $request, $id){
        $taluq = $this->taluqService->getById($id);
        try {
            //code...
            $this->taluqService->toggleStatus($taluq);
            if($taluq->is_active){
                return response()->json(["message" => "Taluq unblocked successfully.", "data" => TaluqCollection::make($taluq)], 200);
            }
            return response()->json(["message" => "Taluq blocked successfully.", "data" => TaluqCollection::make($taluq)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
