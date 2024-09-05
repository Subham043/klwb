<?php

namespace App\Modules\Admins\RegisteredInstituteStaff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstituteStaff\Resources\RegisteredInstituteStaffCollection;
use App\Modules\Admins\RegisteredInstituteStaff\Services\RegisteredInstituteStaffService;
use Illuminate\Http\Request;

class RegisteredInstituteStaffPaginateController extends Controller
{
    public function __construct(private RegisteredInstituteStaffService $staffService, private RegisteredInstituteService $instituteService){}

    public function index(Request $request, $id){
        $school = $this->instituteService->getById($id);
        $data = $this->staffService->paginate($school->profile->school_id, $school->profile->id, $request->total ?? 10);
        return RegisteredInstituteStaffCollection::collection($data);
    }

}
