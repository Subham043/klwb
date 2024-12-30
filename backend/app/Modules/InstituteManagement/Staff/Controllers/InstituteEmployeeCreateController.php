<?php

namespace App\Modules\InstituteManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\InstituteManagement\Staff\Events\InstituteEmployeeCreated;
use App\Modules\InstituteManagement\Staff\Requests\InstituteEmployeeCreatePostRequest;
use App\Modules\InstituteManagement\Staff\Resources\InstituteEmployeeCollection;
use App\Modules\InstituteManagement\Staff\Services\InstituteEmployeeService;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Support\Facades\DB;

class InstituteEmployeeCreateController extends Controller
{
    public function __construct(private InstituteEmployeeService $employeeService){}

    /**
     * Handle the incoming request.
     *
     * @param  \App\Modules\InstituteManagement\Staff\Requests\InstituteEmployeeCreatePostRequest  $request
     * @return \Illuminate\Http\Response
     */
    
    public function index(InstituteEmployeeCreatePostRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $employee = $this->employeeService->create(
                [...$request->validated(), 'created_by' => auth()->guard(Guards::Institute->value())->user()->id, 'school_id'=> auth()->guard(Guards::Institute->value())->user()->school_id]
            );
            $this->employeeService->syncRoles([Roles::InstituteStaff->value()], $employee);
            InstituteEmployeeCreated::dispatch($employee, $request->password);
            return response()->json([
                "message" => "Employee created successfully.",
                "data" => InstituteEmployeeCollection::make($employee),
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
