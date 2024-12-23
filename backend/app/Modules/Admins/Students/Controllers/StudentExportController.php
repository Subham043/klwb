<?php

namespace App\Modules\Admins\Students\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Students\Services\StudentService;

class StudentExportController extends Controller
{
    public function __construct(private StudentService $studentService){}

    /**
     * Exports all students to an excel file.
     *
     * @return \Spatie\SimpleExcel\Exports\Export
     */
    public function index(){
        return $this->studentService->excel()->toBrowser();
    }
}
