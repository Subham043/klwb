<?php

namespace App\Modules\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationDates\Requests\ApplicationDateRequest;
use App\Modules\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateCreateController extends Controller
{
    private $applicationDateService;

    public function __construct(ApplicationDateService $applicationDateService)
    {
        $this->applicationDateService = $applicationDateService;
    }

    public function index(ApplicationDateRequest $request){
        try {
            //code...
            $applicationDate = $this->applicationDateService->create(
                [...$request->validated(), 'user_id' => auth()->user()->id]
            );
            return response()->json(["message" => "Application Date created successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
