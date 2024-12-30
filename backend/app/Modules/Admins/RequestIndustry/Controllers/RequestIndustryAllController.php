<?php

namespace App\Modules\Admins\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\Admins\RequestIndustry\Services\RequestIndustryService;

class RequestIndustryAllController extends Controller
{
    public function __construct(private RequestIndustryService $industryService){}

    /**
     * Fetch all request industries.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(){
        $institute = $this->industryService->all();
        return response()->json(["message" => "Request Industry fetched successfully.", "data" => RequestIndustryCollection::collection($institute)], 200);
    }
}
