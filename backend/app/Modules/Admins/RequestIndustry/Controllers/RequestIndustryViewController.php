<?php

namespace App\Modules\Admins\RequestIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestIndustry\Resources\RequestIndustryCollection;
use App\Modules\Admins\RequestIndustry\Services\RequestIndustryService;

class RequestIndustryViewController extends Controller
{
    public function __construct(private RequestIndustryService $industryService){}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index($id){
        $industry = $this->industryService->getById($id);
        return response()->json(["message" => "Request Industry fetched successfully.", "data" => RequestIndustryCollection::make($industry)], 200);
    }
}
