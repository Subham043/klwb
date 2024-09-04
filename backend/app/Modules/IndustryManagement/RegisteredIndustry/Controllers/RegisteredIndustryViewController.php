<?php

namespace App\Modules\IndustryManagement\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use App\Modules\IndustryManagement\RegisteredIndustry\Services\RegisteredIndustryService;

class RegisteredIndustryViewController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    public function index($id){
        $industry = $this->industryService->getById($id);
        return response()->json(["message" => "Registered Industry fetched successfully.", "data" => RegisteredIndustryCollection::make($industry)], 200);
    }
}
