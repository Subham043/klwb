<?php

namespace App\Modules\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionAllController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    public function index(){
        $question = $this->questionService->all();
        return response()->json(["message" => "Security Question fetched successfully.", "data" => SecurityQuestionCollection::collection($question)], 200);
    }
}
