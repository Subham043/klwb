<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;

class ApplicationDateDeleteController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    public function index($id){
        $applicationDate = $this->applicationDateService->getById($id);

        try {
            //code...
            $this->applicationDateService->delete(
                $applicationDate
            );
            return response()->json(["message" => "Application Date deleted successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
