<?php

namespace App\Modules\Admins\NonRegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\NonRegisteredInstitute\Services\NonRegisteredInstituteService;

class NonRegisteredInstituteExportController extends Controller
{
    public function __construct(private NonRegisteredInstituteService $instituteService){}

    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
