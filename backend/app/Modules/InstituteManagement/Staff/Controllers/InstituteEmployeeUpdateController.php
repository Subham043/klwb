<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Staff\Requests\InstituteEmployeeUpdatePostRequest;
use App\Modules\InstituteManagement\Staff\Resources\InstituteEmployeeCollection;
use App\Modules\InstituteManagement\Staff\Services\InstituteEmployeeService;
use Illuminate\Support\Facades\DB;

class InstituteEmployeeUpdateController extends Controller
{
    private $employeeService;

    public function __construct(InstituteEmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(InstituteEmployeeUpdatePostRequest $request, $id){
        $employee = $this->employeeService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->employeeService->update(
                [...$request->validated()],
                $employee
            );
            return response()->json(["message" => "Employee updated successfully.", "data" => InstituteEmployeeCollection::make($employee)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
