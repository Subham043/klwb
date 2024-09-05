<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustryStaff\Resources\RegisteredIndustryStaffCollection;
use App\Modules\Admins\RegisteredIndustryStaff\Services\RegisteredIndustryStaffService;
use Illuminate\Http\Request;

class RegisteredIndustryStaffPaginateController extends Controller
{
    public function __construct(private RegisteredIndustryStaffService $staffService){}

    public function index(Request $request, $id){
        $industry = (new RegisteredIndustryService)->getById($id);
        $data = $this->staffService->paginate($industry->reg_industry_id, $industry->id, $request->total ?? 10);
        return RegisteredIndustryStaffCollection::collection($data);
    }

}
