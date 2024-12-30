<?php

namespace App\Modules\Admins\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\Admins\RequestIndustry\Services\RequestIndustryService;
use Illuminate\Http\Request;

class RequestIndustryPaginateController extends Controller
{
    public function __construct(private RequestIndustryService $industryService){}

    /**
     * Returns a paginated list of industries.
     *
     * @param Request $request
     * @return RequestIndustryCollection
     */
    public function index(Request $request){
        $data = $this->industryService->paginate($request->total ?? 10);
        return RequestIndustryCollection::collection($data);
    }

}
