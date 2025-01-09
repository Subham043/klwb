<?php

namespace App\Modules\Admins\RegisteredInstituteActivityLog\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstituteActivityLog\Resources\RegisteredInstituteActivityLogCollection;
use App\Modules\Admins\RegisteredInstituteActivityLog\Services\RegisteredInstituteActivityLogService;
use Illuminate\Http\Request;

class RegisteredInstituteActivityLogViewController extends Controller
{
    public function __construct(private RegisteredInstituteActivityLogService $contributionService){}

    /**
     * Show the list of contributions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, string $reg_institute_id, string $id){
        $data = $this->contributionService->getById($reg_institute_id, $id);
        return response()->json(["message" => "Activity Log fetched successfully.", "data" => RegisteredInstituteActivityLogCollection::make($data)], 200);
    }

}