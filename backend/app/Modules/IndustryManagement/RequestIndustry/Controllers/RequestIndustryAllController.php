<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\IndustryManagement\RequestIndustry\Services\RequestIndustryService;

class RequestIndustryAllController extends Controller
{
    private $industryService;

    public function __construct(RequestIndustryService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index(){
        $institute = $this->industryService->all();
        return response()->json(["message" => "Request Industry fetched successfully.", "data" => RequestIndustryCollection::collection($institute)], 200);
    }
}
