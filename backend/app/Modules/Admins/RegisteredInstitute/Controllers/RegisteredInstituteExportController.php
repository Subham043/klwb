<?php

namespace App\Modules\Admins\RegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;

class RegisteredInstituteExportController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
