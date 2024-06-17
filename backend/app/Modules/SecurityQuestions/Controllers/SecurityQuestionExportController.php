<?php

namespace App\Modules\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SecurityQuestions\Exports\SecurityQuestionExport;
use Maatwebsite\Excel\Facades\Excel;

class SecurityQuestionExportController extends Controller
{
    public function index(){
        return Excel::download(new SecurityQuestionExport, 'security_questions.xlsx');
    }
}
