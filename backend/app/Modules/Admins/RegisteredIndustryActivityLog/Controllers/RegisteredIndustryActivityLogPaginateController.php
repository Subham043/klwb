<?php

namespace App\Modules\Admins\RegisteredIndustryActivityLog\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustryActivityLog\Resources\RegisteredIndustryActivityLogCollection;
use App\Modules\Admins\RegisteredIndustryActivityLog\Services\RegisteredIndustryActivityLogService;
use Illuminate\Http\Request;

class RegisteredIndustryActivityLogPaginateController extends Controller
{
    public function __construct(private RegisteredIndustryActivityLogService $logService){}

    /**
     * Show the list of logs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, string $reg_industry_id){
        $data = $this->logService->getList($request->total ?? 10, $reg_industry_id);
        return RegisteredIndustryActivityLogCollection::collection($data);
    }

}
