<?php

namespace App\Modules\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionExportController extends Controller
{
    private $stateService;

    public function __construct(SecurityQuestionService $stateService)
    {
        $this->stateService = $stateService;
    }

    public function index(){
        return $this->stateService->excel()->toBrowser();
    }
}
