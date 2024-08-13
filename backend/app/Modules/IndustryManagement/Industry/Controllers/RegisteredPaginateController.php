<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryRegisteredService;
use App\Modules\IndustryManagement\Industry\Resources\SingleIndustryAuthCollection;
use Illuminate\Http\Request;

class RegisteredPaginateController extends Controller
{
    private $industryService;

    public function __construct(IndustryRegisteredService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index(Request $request){
        $data = $this->industryService->paginate($request->total ?? 10);
        return SingleIndustryAuthCollection::collection($data);
    }

}
