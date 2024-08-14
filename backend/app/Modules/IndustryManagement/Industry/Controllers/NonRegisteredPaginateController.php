<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryNonRegisteredService;
use App\Modules\IndustryManagement\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use Illuminate\Http\Request;

class NonRegisteredPaginateController extends Controller
{
    private $industryService;

    public function __construct(IndustryNonRegisteredService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index(Request $request){
        $data = $this->industryService->paginate($request->total ?? 10);
        return RegisteredIndustryCollection::collection($data);
    }

}