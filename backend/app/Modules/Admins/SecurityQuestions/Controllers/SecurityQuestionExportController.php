<?php

namespace App\Modules\Admins\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionExportController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    public function index(){
        return $this->questionService->excel()->toBrowser();
    }
}