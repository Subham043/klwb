<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryRegisteredService;
use App\Modules\IndustryManagement\Staff\Resources\StaffCollection;
use App\Modules\IndustryManagement\Staff\Services\IndustryStaffService;
use Illuminate\Http\Request;

class StaffPaginateController extends Controller
{
    private $staffService;

    public function __construct(IndustryStaffService $staffService)
    {
        $this->staffService = $staffService;
    }

    public function index(Request $request, $id){
        $industry = (new IndustryRegisteredService)->getById($id);
        $data = $this->staffService->paginate($industry->reg_industry_id, $industry->id, $request->total ?? 10);
        return StaffCollection::collection($data);
    }

}
