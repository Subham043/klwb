<?php

namespace App\Modules\Admins\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Institutes\Services\InstituteService;

class InstituteExportController extends Controller
{
    public function __construct(private InstituteService $instituteService){}

    public function index(){
        return $this->instituteService->excel()->toBrowser();
    }
}
