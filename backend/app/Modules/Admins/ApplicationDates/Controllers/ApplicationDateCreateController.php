<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\ApplicationDates\Requests\ApplicationDateCreateRequest;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateCreateController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    /**
     * Store a newly created ApplicationDate in storage.
     *
     * @param \App\Modules\Admins\ApplicationDates\Requests\ApplicationDateCreateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ApplicationDateCreateRequest $request){
        try {
            //code...
            $applicationDate = $this->applicationDateService->create(
                [...$request->validated(), 'is_active' => 1, 'user_id' => auth()->guard(Guards::Admin->value())->user()->id]
            );
            return response()->json(["message" => "Application Date created successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
