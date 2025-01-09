<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstituteActivityLog\Resources\RegisteredInstituteActivityLogCollection;
use App\Modules\Admins\Contributions\Services\ContributionActivityLogService;
use Illuminate\Http\Request;

class ContributionActivityLogPaginateController extends Controller
{
    public function __construct(private ContributionActivityLogService $logService){}

    /**
     * Show the list of logs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, string $reg_institute_id){
        $data = $this->logService->getList($request->total ?? 10, $reg_institute_id);
        return RegisteredInstituteActivityLogCollection::collection($data);
    }

}
