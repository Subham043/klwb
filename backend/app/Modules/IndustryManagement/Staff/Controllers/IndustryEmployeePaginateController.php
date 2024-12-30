<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Staff\Resources\IndustryEmployeeCollection;
use App\Modules\IndustryManagement\Staff\Services\IndustryEmployeeService;
use Illuminate\Http\Request;

class IndustryEmployeePaginateController extends Controller
{
    public function __construct(private IndustryEmployeeService $employeeService){}

    /**
     * Returns a paginated collection of industry employees.
     *
     * @param Request $request
     * @return IndustryEmployeeCollection
     */
    public function index(Request $request){
        $data = $this->employeeService->paginate($request->total ?? 10);
        return IndustryEmployeeCollection::collection($data);
    }

}
