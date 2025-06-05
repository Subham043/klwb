<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\LocationManagement\States\Exports\StateExport;
use App\Modules\LocationManagement\States\Services\StateService;
use App\Modules\Roles\Enums\Roles;
use Maatwebsite\Excel\Facades\Excel;

class StateExportController extends Controller
{
    public function __construct(private StateService $stateService){}

    /**
     * Download an Excel file containing all states.
     *
     * @return \Maatwebsite\Excel\Excel
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return (auth()->guard(Guards::Admin->value())->user()->current_role == Roles::SuperAdmin->value() || auth()->guard(Guards::Admin->value())->user()->current_role == Roles::Admin->value()) ? Excel::download(new StateExport($this->stateService->getExcelQuery()), 'states.xlsx') : abort(403);
        // return Excel::download(new StateExport($this->stateService->getExcelQuery()), 'states.xlsx');
    }
}
