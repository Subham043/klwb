<?php

namespace App\Modules\Admins\RegisteredIndustryStaff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustryStaff\Resources\RegisteredIndustryStaffCollection;
use App\Modules\Admins\RegisteredIndustryStaff\Services\RegisteredIndustryStaffService;

class RegisteredIndustryStaffViewController extends Controller
{
    public function __construct(private RegisteredIndustryStaffService $staffService){}

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @param  int  $staff_id
     * @return \Illuminate\Http\Response
     */
    public function index($id, $staff_id){
        $industry = (new RegisteredIndustryService)->getById($id);
        $staff = $this->staffService->get($industry->reg_industry_id, $industry->id, $staff_id);
        return response()->json(["message" => "Staff fetched successfully.", "data" => RegisteredIndustryStaffCollection::make($staff)], 200);
    }

}
