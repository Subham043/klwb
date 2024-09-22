<?php

namespace App\Modules\Admins\RegisteredInstituteStaff\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstituteStaff\Resources\RegisteredInstituteStaffCollection;
use App\Modules\Admins\RegisteredInstituteStaff\Services\RegisteredInstituteStaffService;
use Illuminate\Support\Facades\DB;

class RegisteredInstituteStaffToggleController extends Controller
{
    public function __construct(private RegisteredInstituteStaffService $staffService, private RegisteredInstituteService $instituteService){}

    public function index(ToggleStatusRequest $request, $id, $staff_id){
        $school = $this->instituteService->getById($id);
        $staff = $this->staffService->get($school->profile->school_id, $school->profile->id, $staff_id);
        DB::beginTransaction();
        try {
            $this->staffService->toggleStatus($staff);
            if($staff->is_blocked){
                return response()->json(["message" => "Staff Unblocked successfully.", "data" => RegisteredInstituteStaffCollection::make($staff)], 200);
            }
            return response()->json(["message" => "Staff Blocked successfully.", "data" => RegisteredInstituteStaffCollection::make($staff)], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }

}
