<?php

namespace App\Modules\ApplicationManagement\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\ApplicationManagement\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateViewController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    public function index($id){
        $applicationDate = $this->applicationDateService->getById($id);
        return response()->json(["message" => "Application Date fetched successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 200);
    }
}
