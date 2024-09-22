<?php

namespace App\Modules\Admins\RegisteredInstituteStaff\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstituteStaff\Resources\RegisteredInstituteStaffCollection;
use App\Modules\Admins\RegisteredInstituteStaff\Services\RegisteredInstituteStaffService;
use Illuminate\Support\Facades\DB;

class RegisteredInstituteStaffVerificationController extends Controller
{
    public function __construct(private RegisteredInstituteStaffService $staffService, private RegisteredInstituteService $instituteService){}

    public function index(ToggleStatusRequest $request, $id, $staff_id){
        $school = $this->instituteService->getById($id);
        $staff = $this->staffService->get($school->profile->school_id, $school->profile->id, $staff_id);
        if($staff->verified_at){
            return response()->json(["message" => "Staff already verified."], 400);
        }
        DB::beginTransaction();
        try {
            $staff->update(['verified_at'=>now()]);
            $staff->refresh();
            return response()->json(["message" => "Staff verified successfully.", "data" => RegisteredInstituteStaffCollection::make($staff)], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }

}
