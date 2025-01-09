<?php

namespace App\Modules\Admins\StudentActivityLog\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\StudentActivityLog\Resources\StudentActivityLogCollection;
use App\Modules\Admins\StudentActivityLog\Services\StudentActivityLogService;
use Illuminate\Http\Request;

class StudentActivityLogViewController extends Controller
{
    public function __construct(private StudentActivityLogService $contributionService){}

    /**
     * Show the list of contributions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, string $user_id, string $id){
        $data = $this->contributionService->getById($user_id, $id);
        return response()->json(["message" => "Activity Log fetched successfully.", "data" => StudentActivityLogCollection::make($data)], 200);
    }

}