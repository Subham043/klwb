<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\States\Exports\StateExport;
use App\Modules\LocationManagement\States\Services\StateService;
use Maatwebsite\Excel\Facades\Excel;

class StateExportController extends Controller
{
    private $stateService;

    public function __construct(StateService $stateService)
    {
        $this->stateService = $stateService;
    }

    public function index(){
        $data = $this->stateService->all();
        return Excel::download(new StateExport($data), 'states.xlsx');
    }
}
