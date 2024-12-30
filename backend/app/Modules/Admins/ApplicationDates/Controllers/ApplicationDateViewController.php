<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateViewController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    /**
     * Display the specified ApplicationDate.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $applicationDate = $this->applicationDateService->getById($id);
        return response()->json(["message" => "Application Date fetched successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 200);
    }
}
