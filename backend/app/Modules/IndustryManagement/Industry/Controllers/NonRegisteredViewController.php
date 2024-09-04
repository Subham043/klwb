<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryNonRegisteredService;
use App\Modules\IndustryManagement\RegisteredIndustry\Resources\RegisteredIndustryCollection;

class NonRegisteredViewController extends Controller
{
    public function __construct(private IndustryNonRegisteredService $industryService){}

    public function index($id){
        $industry = $this->industryService->getById($id);
        return response()->json(["message" => "Industry Non Registered fetched successfully.", "data" => RegisteredIndustryCollection::make($industry)], 200);
    }
}
