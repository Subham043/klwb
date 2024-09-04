<?php

namespace App\Modules\LocationManagement\States\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\LocationManagement\States\Services\StateService;

class StateExportController extends Controller
{
    public function __construct(private StateService $stateService){}

    public function index(){
        return $this->stateService->excel()->toBrowser();
    }
}
