<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Staff\Requests\IndustryEmployeeUpdatePostRequest;
use App\Modules\IndustryManagement\Staff\Resources\IndustryEmployeeCollection;
use App\Modules\IndustryManagement\Staff\Services\IndustryEmployeeService;
use Illuminate\Support\Facades\DB;

class IndustryEmployeeUpdateController extends Controller
{
    private $employeeService;

    public function __construct(IndustryEmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(IndustryEmployeeUpdatePostRequest $request, $id){
        $employee = $this->employeeService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->employeeService->update(
                [...$request->validated()],
                $employee
            );
            return response()->json(["message" => "Employee updated successfully.", "data" => IndustryEmployeeCollection::make($employee)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
