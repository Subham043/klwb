<?php

namespace App\Modules\Admins\RegisteredIndustryActivityLog\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustryActivityLog\Resources\RegisteredIndustryActivityLogCollection;
use App\Modules\Admins\RegisteredIndustryActivityLog\Services\RegisteredIndustryActivityLogService;
use Illuminate\Http\Request;

class RegisteredIndustryActivityLogViewController extends Controller
{
    public function __construct(private RegisteredIndustryActivityLogService $contributionService){}

    /**
     * Show the list of contributions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, string $reg_industry_id, string $id){
        $data = $this->contributionService->getById($reg_industry_id, $id);
        return response()->json(["message" => "Activity Log fetched successfully.", "data" => RegisteredIndustryActivityLogCollection::make($data)], 200);
    }

}