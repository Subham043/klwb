<?php

namespace App\Modules\Admins\Scholarship\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Scholarship\Services\AdminScholarshipService;

class AdminScholarshipExportController extends Controller
{
    public function __construct(private AdminScholarshipService $scholarshipService){}

    public function index(){
        return $this->scholarshipService->excel()->toBrowser();
    }
}
