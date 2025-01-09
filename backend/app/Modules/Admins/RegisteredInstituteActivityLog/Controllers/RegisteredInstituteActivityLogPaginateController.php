<?php

namespace App\Modules\Admins\RegisteredInstituteActivityLog\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstituteActivityLog\Resources\RegisteredInstituteActivityLogCollection;
use App\Modules\Admins\RegisteredInstituteActivityLog\Services\RegisteredInstituteActivityLogService;
use Illuminate\Http\Request;

class RegisteredInstituteActivityLogPaginateController extends Controller
{
    public function __construct(private RegisteredInstituteActivityLogService $logService){}

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
