<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\IndustryManagement\RequestIndustry\Services\RequestIndustryService;

class RequestIndustryDeleteController extends Controller
{
    public function __construct(private RequestIndustryService $industryService){}

    public function index($id){
        $industry = $this->industryService->getById($id);

        try {
            //code...
            $this->industryService->delete(
                $industry
            );
            return response()->json(["message" => "Request Industry deleted successfully.", "data" => RequestIndustryCollection::make($industry)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
