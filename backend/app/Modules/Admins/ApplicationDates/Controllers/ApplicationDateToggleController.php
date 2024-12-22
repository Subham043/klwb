<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateToggleController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    /**
     * Toggle status of an Application Date.
     *
     * @param ToggleStatusRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ToggleStatusRequest $request, $id){
        $applicationDate = $this->applicationDateService->getById($id);
        try {
            //code...
            $this->applicationDateService->toggleStatus($applicationDate);
            if($applicationDate->is_active){
                return response()->json(["message" => "Application Date unblocked successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 200);
            }
            return response()->json(["message" => "Application Date blocked successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
