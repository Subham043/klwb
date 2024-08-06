<?php

namespace App\Modules\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionViewController extends Controller
{
    private $questionService;

    public function __construct(SecurityQuestionService $questionService)
    {
        $this->questionService = $questionService;
    }

    public function index($id){
        $question = $this->questionService->getById($id);
        return response()->json(["message" => "Security Question fetched successfully.", "data" => SecurityQuestionCollection::make($question)], 200);
    }
}
