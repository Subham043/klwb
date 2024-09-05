<?php

namespace App\Modules\Admins\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\Admins\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionViewController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    public function index($id){
        $question = $this->questionService->getById($id);
        return response()->json(["message" => "Security Question fetched successfully.", "data" => SecurityQuestionCollection::make($question)], 200);
    }
}
