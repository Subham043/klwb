<?php

namespace App\Modules\IndustryManagement\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use App\Modules\IndustryManagement\RegisteredIndustry\Services\RegisteredIndustryService;
use Illuminate\Http\Request;

class RegisteredIndustryPaginateController extends Controller
{
    private $industryService;

    public function __construct(RegisteredIndustryService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index(Request $request){
        $data = $this->industryService->paginate($request->total ?? 10);
        return RegisteredIndustryCollection::collection($data);
    }

}
