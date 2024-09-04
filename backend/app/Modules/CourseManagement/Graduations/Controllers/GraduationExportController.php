<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;

class GraduationExportController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    public function index(){
        return $this->graduationService->excel()->toBrowser();
    }
}
