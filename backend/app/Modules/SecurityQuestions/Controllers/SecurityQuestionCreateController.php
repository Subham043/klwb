<?php

namespace App\Modules\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SecurityQuestions\Requests\SecurityQuestionRequest;
use App\Modules\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionCreateController extends Controller
{
    private $questionService;

    public function __construct(SecurityQuestionService $questionService)
    {
        $this->questionService = $questionService;
    }

    public function index(SecurityQuestionRequest $request){
        try {
            //code...
            $question = $this->questionService->create(
                $request->validated()
            );
            return response()->json(["message" => "Security Question created successfully.", "data" => SecurityQuestionCollection::make($question)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}