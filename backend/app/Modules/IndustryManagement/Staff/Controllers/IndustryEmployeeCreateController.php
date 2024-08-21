<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\IndustryManagement\Staff\Events\IndustryEmployeeCreated;
use App\Modules\IndustryManagement\Staff\Requests\IndustryEmployeeCreatePostRequest;
use App\Modules\IndustryManagement\Staff\Resources\IndustryEmployeeCollection;
use App\Modules\IndustryManagement\Staff\Services\IndustryEmployeeService;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Support\Facades\DB;

class IndustryEmployeeCreateController extends Controller
{
    private $employeeService;

    public function __construct(IndustryEmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index(IndustryEmployeeCreatePostRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $employee = $this->employeeService->create(
                [...$request->validated(), 'created_by' => auth()->guard(Guards::Industry->value())->user()->id, 'reg_industry_id'=> auth()->guard(Guards::Industry->value())->user()->reg_industry_id]
            );
            $this->employeeService->syncRoles([Roles::IndustryStaff->value()], $employee);
            IndustryEmployeeCreated::dispatch($employee, $request->password);
            return response()->json([
                "message" => "Employee created successfully.",
                "data" => IndustryEmployeeCollection::make($employee),
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
