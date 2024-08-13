<?php

namespace App\Modules\IndustryManagement\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use App\Modules\IndustryManagement\RegisteredIndustry\Services\RegisteredIndustryService;

class RegisteredIndustryViewController extends Controller
{
    private $industryService;

    public function __construct(RegisteredIndustryService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index($id){
        $industry = $this->industryService->getById($id);
        return response()->json(["message" => "Registered Industry fetched successfully.", "data" => RegisteredIndustryCollection::make($industry)], 200);
    }
}
