<?php

namespace App\Modules\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationDates\Requests\ApplicationDateUpdateRequest;
use App\Modules\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateUpdateController extends Controller
{
    private $applicationDateService;

    public function __construct(ApplicationDateService $applicationDateService)
    {
        $this->applicationDateService = $applicationDateService;
    }

    public function index(ApplicationDateUpdateRequest $request, $id){
        $applicationDate = $this->applicationDateService->getById($id);
        if (!(now()->between($applicationDate->from_date->format('Y-m-d'), $applicationDate->to_date->format('Y-m-d')))) {
            return response()->json(["message" => "You can not update application date."], 400);
        }
        try {
            //code...
            $this->applicationDateService->update(
                $request->validated(),
                $applicationDate
            );
            return response()->json(["message" => "Application Date updated successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}