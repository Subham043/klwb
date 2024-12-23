<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;

class GraduationExportController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    /**
     * Export graduation data to a browser-friendly format.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */

    public function index(){
        return $this->graduationService->excel()->toBrowser();
    }
}
