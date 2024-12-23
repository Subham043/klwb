<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\States\Services\StateService;

class StateExportController extends Controller
{
    public function __construct(private StateService $stateService){}

    /**
     * Download an Excel file containing all states.
     *
     * @return \Maatwebsite\Excel\Excel
     */
    public function index(){
        return $this->stateService->excel()->toBrowser();
    }
}
