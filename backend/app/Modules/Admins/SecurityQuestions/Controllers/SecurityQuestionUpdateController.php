<?php

namespace App\Modules\Admins\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\SecurityQuestions\Requests\SecurityQuestionRequest;
use App\Modules\Admins\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\Admins\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionUpdateController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    /**
     * Update a security question.
     * 
     * @param SecurityQuestionRequest $request
     * @param int $id The id of the security question
     * 
     * @response 200 {
     *   "message": "Security Question updated successfully.",
     *   "data": {
     *     "id": 1,
     *     "question": "What is your mother's maiden name?"
     *   }
     * }
     * 
     * @response 400 {
     *   "message": "Something went wrong. Please try again"
     * }
     */
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
