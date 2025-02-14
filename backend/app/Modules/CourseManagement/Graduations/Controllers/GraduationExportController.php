<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Exports\GraduationExport;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;
use Maatwebsite\Excel\Facades\Excel;

class GraduationExportController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    /**
     * Export graduation data to a browser-friendly format.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */

    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new GraduationExport($this->graduationService->getExcelQuery()), 'graduations.xlsx');
    }
}
