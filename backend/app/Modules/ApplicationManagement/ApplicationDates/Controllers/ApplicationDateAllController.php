<?php

namespace App\Modules\ApplicationManagement\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\ApplicationManagement\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateAllController extends Controller
{

    public function __construct(private ApplicationDateService $applicationDateService){}

    public function index(){
        $applicationDate = $this->applicationDateService->all();
        return response()->json(["message" => "Application Date fetched successfully.", "data" => ApplicationDateCollection::collection($applicationDate)], 200);
    }
}
