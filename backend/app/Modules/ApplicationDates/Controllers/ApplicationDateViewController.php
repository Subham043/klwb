<?php

namespace App\Modules\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateViewController extends Controller
{
    private $applicationDateService;

    public function __construct(ApplicationDateService $applicationDateService)
    {
        $this->applicationDateService = $applicationDateService;
    }

    public function index($id){
        $applicationDate = $this->applicationDateService->getById($id);
        return response()->json(["message" => "Application Date fetched successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 200);
    }
}