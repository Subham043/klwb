<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryNonRegisteredService;
use App\Modules\IndustryManagement\RegisteredIndustry\Resources\RegisteredIndustryCollection;

class NonRegisteredViewController extends Controller
{
    private $industryService;

    public function __construct(IndustryNonRegisteredService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index($id){
        $industry = $this->industryService->getById($id);
        return response()->json(["message" => "Industry Non Registered fetched successfully.", "data" => RegisteredIndustryCollection::make($industry)], 200);
    }
}
