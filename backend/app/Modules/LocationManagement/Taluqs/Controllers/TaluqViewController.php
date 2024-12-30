<?php

namespace App\Modules\LocationManagement\Taluqs\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\Taluqs\Resources\TaluqCollection;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;

class TaluqViewController extends Controller
{
    public function __construct(private TaluqService $taluqService){}

/**
 * Display the specified Taluq resource.
 *
 * @param int $id The ID of the Taluq to retrieve.
 * @return \Illuminate\Http\JsonResponse The JSON response containing the Taluq data.
 */

    public function index($id){
        $taluq = $this->taluqService->getById($id);
        return response()->json(["message" => "Taluq fetched successfully.", "data" => TaluqCollection::make($taluq)], 200);
    }
}
