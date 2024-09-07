<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Requests\ApplicationDateUpdateRequest;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateUpdateController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    public function index(ApplicationDateUpdateRequest $request, $id){
        $applicationDate = $this->applicationDateService->getById($id);
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
