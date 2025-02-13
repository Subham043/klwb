<?php

namespace App\Modules\Admins\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\SecurityQuestions\Exports\SecurityQuestionExport;
use App\Modules\Admins\SecurityQuestions\Services\SecurityQuestionService;
use Maatwebsite\Excel\Facades\Excel;

class SecurityQuestionExportController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    /**
     * Download all security questions as an Excel file.
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function index(){
        ini_set('memory_limit', '-1');
        ini_set('max_execution_time', 300);
        return Excel::download(new SecurityQuestionExport($this->questionService->getExcelQuery()), 'security_questions.xlsx');
    }
}
