<?php

namespace App\Modules\Admins\RegisteredInstituteStaff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstituteStaff\Resources\RegisteredInstituteStaffCollection;
use App\Modules\Admins\RegisteredInstituteStaff\Services\RegisteredInstituteStaffService;

class RegisteredInstituteStaffViewController extends Controller
{
    public function __construct(private RegisteredInstituteStaffService $staffService, private RegisteredInstituteService $instituteService){}

/**
 * Display the specified staff resource.
 *
 * @param int $id The ID of the institute
 * @param int $staff_id The ID of the staff member
 * @return \Illuminate\Http\JsonResponse JSON response containing the staff data
 */

    public function index($id, $staff_id){
        $school = $this->instituteService->getById($id);
        $staff = $this->staffService->get($school->profile->school_id, $school->profile->id, $staff_id);
        return response()->json(["message" => "Staff fetched successfully.", "data" => RegisteredInstituteStaffCollection::make($staff)], 200);
    }

}
