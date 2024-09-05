<?php

namespace App\Modules\Admins\NonRegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\NonRegisteredIndustry\Resources\NonRegisteredIndustryCollection;
use App\Modules\Admins\NonRegisteredIndustry\Services\NonRegisteredIndustryService;
use Illuminate\Http\Request;

class NonRegisteredIndustryPaginateController extends Controller
{
    public function __construct(private NonRegisteredIndustryService $industryService){}

    public function index(Request $request){
        $data = $this->industryService->paginate($request->total ?? 10);
        return NonRegisteredIndustryCollection::collection($data);
    }

}
