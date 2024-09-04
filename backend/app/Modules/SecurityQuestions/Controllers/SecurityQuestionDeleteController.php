<?php

namespace App\Modules\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionDeleteController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    public function index($id){
        $question = $this->questionService->getById($id);

        try {
            //code...
            $this->questionService->delete(
                $question
            );
            return response()->json(["message" => "Security Question deleted successfully.", "data" => SecurityQuestionCollection::make($question)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
