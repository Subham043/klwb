<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;
use Illuminate\Http\Request;

class ApplicationDatePaginateController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    public function index(Request $request){
        $data = $this->applicationDateService->paginate($request->total ?? 10);
        return ApplicationDateCollection::collection($data);
    }

}
