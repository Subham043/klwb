<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Exports\GraduationExport;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;
use Maatwebsite\Excel\Facades\Excel;

class GraduationExportController extends Controller
{
    private $graduationService;

    public function __construct(GraduationService $graduationService)
    {
        $this->graduationService = $graduationService;
    }

    public function index(){
        $graduation = $this->graduationService->all();
        return Excel::download(new GraduationExport($graduation), 'graduations.xlsx');
    }
}
