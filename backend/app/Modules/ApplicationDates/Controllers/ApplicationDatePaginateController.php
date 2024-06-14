<?php

namespace App\Modules\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\ApplicationDates\Services\ApplicationDateService;
use Illuminate\Http\Request;

class ApplicationDatePaginateController extends Controller
{
    private $applicationDateService;

    public function __construct(ApplicationDateService $applicationDateService)
    {
        $this->applicationDateService = $applicationDateService;
    }

    public function index(Request $request){
        $data = $this->applicationDateService->paginate($request->total ?? 10);
        return ApplicationDateCollection::collection($data);
    }

}