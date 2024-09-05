<?php

namespace App\Modules\Admins\NonRegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\NonRegisteredIndustry\Resources\NonRegisteredIndustryCollection;
use App\Modules\Admins\NonRegisteredIndustry\Services\NonRegisteredIndustryService;

class NonRegisteredIndustryViewController extends Controller
{
    public function __construct(private NonRegisteredIndustryService $industryService){}

    public function index($id){
        $industry = $this->industryService->getById($id);
        return response()->json(["message" => "Industry Non Registered fetched successfully.", "data" => NonRegisteredIndustryCollection::make($industry)], 200);
    }
}
