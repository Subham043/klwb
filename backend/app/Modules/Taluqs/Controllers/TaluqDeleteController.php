<?php

namespace App\Modules\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Taluqs\Resources\TaluqCollection;
use App\Modules\Taluqs\Services\TaluqService;

class TaluqDeleteController extends Controller
{
    private $taluqService;

    public function __construct(TaluqService $taluqService)
    {
        $this->taluqService = $taluqService;
    }

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