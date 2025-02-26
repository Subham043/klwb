<?php

namespace App\Modules\Admins\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\SecurityQuestions\Requests\SecurityQuestionRequest;
use App\Modules\Admins\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\Admins\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionCreateController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    /**
     * Create a new security question.
     *
     * @bodyParam question string required The security question.
     * 
     * @response 201 {
     *   "message": "Security Question created successfully.",
     *   "data": {
     *     "id": 1,
     *     "question": "What is your mother's maiden name?",
     *     "is_active": true
     *   }
     * }
     * 
     * @response 400 {
     *   "message": "Something went wrong. Please try again"
     * }
     */
    public function index(SecurityQuestionRequest $request){
        try {
            //code...
            $question = $this->questionService->create(
                [...$request->validated(), 'is_active' => 1]
            );
            return response()->json(["message" => "Security Question created successfully.", "data" => SecurityQuestionCollection::make($question)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
