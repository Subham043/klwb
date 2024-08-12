<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\IndustryManagement\RequestIndustry\Services\RequestIndustryService;

class RequestIndustryViewController extends Controller
{
    private $industryService;

    public function __construct(RequestIndustryService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index($id){
        $industry = $this->industryService->getById($id);
        return response()->json(["message" => "Request Industry fetched successfully.", "data" => RequestIndustryCollection::make($industry)], 200);
    }
}
