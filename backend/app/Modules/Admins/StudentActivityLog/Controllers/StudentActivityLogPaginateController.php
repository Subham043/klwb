<?php

namespace App\Modules\Admins\StudentActivityLog\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\StudentActivityLog\Resources\StudentActivityLogCollection;
use App\Modules\Admins\StudentActivityLog\Services\StudentActivityLogService;
use Illuminate\Http\Request;

class StudentActivityLogPaginateController extends Controller
{
    public function __construct(private StudentActivityLogService $logService){}

    /**
     * Show the list of logs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, string $user_id){
        $data = $this->logService->getList($request->total ?? 10, $user_id);
        return StudentActivityLogCollection::collection($data);
    }

}
