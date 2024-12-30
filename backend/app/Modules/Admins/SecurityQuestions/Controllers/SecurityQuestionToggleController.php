<?php

namespace App\Modules\Admins\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\Admins\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionToggleController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    /**
     * Toggle the status of a security question
     * 
     * @param ToggleStatusRequest $request
     * @param int $id
     * 
     * @response 200 {
     *   "message": "Security Question unblocked successfully.",
     *   "data": {
     *     "id": 1,
     *     "question": "What is your mother's maiden name?"
     *   }
     * }
     * 
     * @response 200 {
     *   "message": "Security Question blocked successfully.",
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
    public function index(ToggleStatusRequest $request, $id){
        $question = $this->questionService->getById($id);
        try {
            //code...
            $this->questionService->toggleStatus($question);
            if($question->is_active){
                return response()->json(["message" => "Security Question unblocked successfully.", "data" => SecurityQuestionCollection::make($question)], 200);
            }
            return response()->json(["message" => "Security Question blocked successfully.", "data" => SecurityQuestionCollection::make($question)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
