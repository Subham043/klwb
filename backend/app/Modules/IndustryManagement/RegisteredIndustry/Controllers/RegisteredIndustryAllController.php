<?php

namespace App\Modules\IndustryManagement\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use App\Modules\IndustryManagement\RegisteredIndustry\Services\RegisteredIndustryService;

class RegisteredIndustryAllController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    public function index(){
        $industry = $this->industryService->all();
        return response()->json(["message" => "Registered Industry fetched successfully.", "data" => RegisteredIndustryCollection::collection($industry)], 200);
    }
}
