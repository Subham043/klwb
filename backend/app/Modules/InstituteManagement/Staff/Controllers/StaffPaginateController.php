<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Resources\InstituteProfileCollection;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use App\Modules\InstituteManagement\Staff\Services\InstituteStaffService;
use Illuminate\Http\Request;

class StaffPaginateController extends Controller
{
    public function __construct(private InstituteStaffService $staffService){}

    public function index(Request $request, $id){
        $school = (new InstituteRegisteredService)->getById($id);
        $data = $this->staffService->paginate($school->profile->school_id, $school->profile->id, $request->total ?? 10);
        return InstituteProfileCollection::collection($data);
    }

}
