<?php

namespace App\Modules\Admins\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\SecurityQuestions\Requests\SecurityQuestionRequest;
use App\Modules\Admins\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\Admins\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionUpdateController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    public function index(SecurityQuestionRequest $request, $id){
        $question = $this->questionService->getById($id);
        try {
            //code...
            $this->questionService->update(
                $request->validated(),
                $question
            );
            return response()->json(["message" => "Security Question updated successfully.", "data" => SecurityQuestionCollection::make($question)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
