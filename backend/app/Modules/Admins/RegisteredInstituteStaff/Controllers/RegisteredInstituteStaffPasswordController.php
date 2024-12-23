<?php

namespace App\Modules\Admins\RegisteredInstituteStaff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstituteStaff\Requests\RegisteredInstituteStaffPasswordRequest;
use App\Modules\Admins\RegisteredInstituteStaff\Services\RegisteredInstituteStaffService;
use Illuminate\Support\Facades\DB;

class RegisteredInstituteStaffPasswordController extends Controller
{
    public function __construct(private RegisteredInstituteStaffService $staffService, private RegisteredInstituteService $instituteService){}

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Modules\Admins\RegisteredInstituteStaff\Requests\RegisteredInstituteStaffPasswordRequest  $request
     * @param  int  $id
     * @param  int  $staff_id
     * @return \Illuminate\Http\Response
     */
    public function index(RegisteredInstituteStaffPasswordRequest $request, $id, $staff_id){
        $school = $this->instituteService->getById($id);
        $staff = $this->staffService->get($school->profile->school_id, $school->profile->id, $staff_id);
        DB::beginTransaction();
        try {
            $this->staffService->update($request->validated(), $staff);
            return response()->json(["message" => "Staff updated successfully."], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }

}
