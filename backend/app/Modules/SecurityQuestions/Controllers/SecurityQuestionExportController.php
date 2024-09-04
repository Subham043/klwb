<?php

namespace App\Modules\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionExportController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    public function index(){
        return $this->questionService->excel()->toBrowser();
    }
}
