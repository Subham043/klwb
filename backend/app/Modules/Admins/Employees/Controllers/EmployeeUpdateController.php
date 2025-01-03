<?php

namespace App\Modules\Admins\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Employees\Requests\EmployeeUpdatePostRequest;
use App\Modules\Admins\Employees\Resources\EmployeeCollection;
use App\Modules\Admins\Employees\Services\EmployeeService;
use Illuminate\Support\Facades\DB;

class EmployeeUpdateController extends Controller
{
    public function __construct(private EmployeeService $employeeService){}

    /**
     * Update an employee
     *
     * @param EmployeeUpdatePostRequest $request
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(EmployeeUpdatePostRequest $request, $id){
        $employee = $this->employeeService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->employeeService->update(
                [...$request->except(['role'])],
                $employee
            );
            $this->employeeService->syncRoles([$request->role], $employee);
            return response()->json(["message" => "Employee updated successfully.", "data" => EmployeeCollection::make($employee)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
