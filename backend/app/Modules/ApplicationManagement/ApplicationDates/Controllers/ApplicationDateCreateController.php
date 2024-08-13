<?php

namespace App\Modules\ApplicationManagement\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\ApplicationManagement\ApplicationDates\Requests\ApplicationDateCreateRequest;
use App\Modules\ApplicationManagement\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\ApplicationManagement\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateCreateController extends Controller
{
    private $applicationDateService;

    public function __construct(ApplicationDateService $applicationDateService)
    {
        $this->applicationDateService = $applicationDateService;
    }

    public function index(ApplicationDateCreateRequest $request){
        try {
            //code...
            $applicationDate = $this->applicationDateService->create(
                [...$request->validated(), 'user_id' => auth()->guard(Guards::Admin->value())->user()->id]
            );
            return response()->json(["message" => "Application Date created successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
