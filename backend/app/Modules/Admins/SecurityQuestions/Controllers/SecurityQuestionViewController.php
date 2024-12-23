<?php

namespace App\Modules\Admins\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\Admins\SecurityQuestions\Services\SecurityQuestionService;

class SecurityQuestionViewController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    /**
     * @OA\Get(
     *     path="/api/admin/v1/security-questions/view/{id}",
     *     tags={"Security Questions"},
     *     summary="Get a Security Question by ID",
     *     description="Get a Security Question by ID",
     *     @OA\Parameter(
     *         description="Security Question ID",
     *         in="path",
     *         name="id",
     *         required=true,
     *         example="1",
     *         @OA\Schema(
     *             type="integer",
     *             format="int64"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response"
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function index($id){
        $question = $this->questionService->getById($id);
        return response()->json(["message" => "Security Question fetched successfully.", "data" => SecurityQuestionCollection::make($question)], 200);
    }
}
