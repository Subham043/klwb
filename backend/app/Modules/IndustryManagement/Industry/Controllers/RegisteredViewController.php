<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryRegisteredService;
use App\Modules\IndustryManagement\Industry\Resources\SingleIndustryAuthCollection;

class RegisteredViewController extends Controller
{
    private $industryService;

    public function __construct(IndustryRegisteredService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index($id){
        $industry = $this->industryService->getById($id);
        return response()->json(["message" => "Industry Registered fetched successfully.", "data" => SingleIndustryAuthCollection::make($industry)], 200);
    }
}
