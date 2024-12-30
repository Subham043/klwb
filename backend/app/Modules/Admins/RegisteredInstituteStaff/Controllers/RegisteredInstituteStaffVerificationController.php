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

    /**
     * Verify the specified institute staff.
     *
     * @param ToggleStatusRequest $request
     * @param int $id
     * @param int $staff_id
     * @return \Illuminate\Http\JsonResponse
     * 
     * This method retrieves the institute and staff by their IDs. If the staff is already
     * verified, it returns a 400 response with a message indicating the staff is already
     * verified. Otherwise, it attempts to verify the staff by updating the verified_at
     * timestamp. If successful, it returns a 200 response with the updated staff data.
     * In case of any errors, it rolls back the transaction and returns a 400 response
     * with an error message.
     */

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
