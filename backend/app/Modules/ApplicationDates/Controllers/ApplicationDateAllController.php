<?php

namespace App\Modules\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateAllController extends Controller
{
    private $applicationDateService;

    public function __construct(ApplicationDateService $applicationDateService)
    {
        $this->applicationDateService = $applicationDateService;
    }

    public function index(){
        $applicationDate = $this->applicationDateService->all();
        return response()->json(["message" => "Application Date fetched successfully.", "data" => ApplicationDateCollection::collection($applicationDate)], 200);
    }
}