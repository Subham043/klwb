<?php

namespace App\Modules\Admins\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\Admins\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionAllController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(){
        $question = $this->questionService->all();
        return response()->json(["message" => "Security Question fetched successfully.", "data" => SecurityQuestionCollection::collection($question)], 200);
    }
}
