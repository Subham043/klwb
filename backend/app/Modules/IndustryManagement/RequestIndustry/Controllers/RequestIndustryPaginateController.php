<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\IndustryManagement\RequestIndustry\Services\RequestIndustryService;
use Illuminate\Http\Request;

class RequestIndustryPaginateController extends Controller
{
    private $industryService;

    public function __construct(RequestIndustryService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index(Request $request){
        $data = $this->industryService->paginate($request->total ?? 10);
        return RequestIndustryCollection::collection($data);
    }

}
