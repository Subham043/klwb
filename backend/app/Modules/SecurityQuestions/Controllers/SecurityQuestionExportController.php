<?php

namespace App\Modules\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SecurityQuestions\Exports\SecurityQuestionExport;
use App\Modules\SecurityQuestions\Services\SecurityQuestionService;
use Maatwebsite\Excel\Facades\Excel;

class SecurityQuestionExportController extends Controller
{
    private $stateService;

    public function __construct(SecurityQuestionService $stateService)
    {
        $this->stateService = $stateService;
    }

    public function index(){
        $data = $this->stateService->all();
        return Excel::download(new SecurityQuestionExport($data), 'security_questions.xlsx');
    }
}
