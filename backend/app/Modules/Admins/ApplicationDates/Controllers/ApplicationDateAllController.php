<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateAllController extends Controller
{

    public function __construct(private ApplicationDateService $applicationDateService){}

    /**
     * Get all application dates.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(){
        $applicationDate = $this->applicationDateService->all();
        return response()->json(["message" => "Application Date fetched successfully.", "data" => ApplicationDateCollection::collection($applicationDate)], 200);
    }
}
