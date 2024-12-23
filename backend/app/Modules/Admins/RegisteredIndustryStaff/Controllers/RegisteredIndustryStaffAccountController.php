<?php

namespace App\Modules\Admins\RegisteredIndustryStaff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustryStaff\Requests\RegisteredIndustryStaffAccountRequest;
use App\Modules\Admins\RegisteredIndustryStaff\Resources\RegisteredIndustryStaffCollection;
use App\Modules\Admins\RegisteredIndustryStaff\Services\RegisteredIndustryStaffService;
use Illuminate\Support\Facades\DB;

class RegisteredIndustryStaffAccountController extends Controller
{
    public function __construct(private RegisteredIndustryStaffService $staffService){}

    /**
     * Update a specific staff account.
     *
     * @param RegisteredIndustryStaffAccountRequest $request
     * @param int $id
     * @param int $staff_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(RegisteredIndustryStaffAccountRequest $request, $id, $staff_id){
        $industry = (new RegisteredIndustryService)->getById($id);
        $staff = $this->staffService->get($industry->reg_industry_id, $industry->id, $staff_id);
        DB::beginTransaction();
        try {
            $this->staffService->update($request->validated(), $staff);
            return response()->json(["message" => "Staff updated successfully.", "data" => RegisteredIndustryStaffCollection::make($staff)], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }

}
