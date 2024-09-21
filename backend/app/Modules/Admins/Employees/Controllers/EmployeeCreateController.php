<?php

namespace App\Modules\Admins\Employees\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Employees\Events\EmployeeCreated;
use App\Modules\Admins\Employees\Requests\EmployeeCreatePostRequest;
use App\Modules\Admins\Employees\Resources\EmployeeCollection;
use App\Modules\Admins\Employees\Services\EmployeeService;
use Illuminate\Support\Facades\DB;

class EmployeeCreateController extends Controller
{

    public function __construct(private EmployeeService $employeeService){}

    public function index(EmployeeCreatePostRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $employee = $this->employeeService->create(
                [
                    ...$request->except('role'), 
                    'created_by' => auth()->guard(Guards::Admin->value())->user()->id,
                    'is_blocked' => 0
                ]
            );
            $this->employeeService->syncRoles([$request->role], $employee);
            EmployeeCreated::dispatch($employee, $request->password);
            return response()->json([
                "message" => "Employee created successfully.",
                "data" => EmployeeCollection::make($employee),
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
