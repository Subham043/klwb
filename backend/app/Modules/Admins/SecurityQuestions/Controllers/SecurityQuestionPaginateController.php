<?php

namespace App\Modules\Admins\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\Admins\SecurityQuestions\Services\SecurityQuestionService;
use Illuminate\Http\Request;

class SecurityQuestionPaginateController extends Controller
{
    public function __construct(private SecurityQuestionService $questionService){}

    /**
     * Display a listing of the resource.
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    
    public function index(Request $request){
        $data = $this->questionService->paginate($request->total ?? 10);
        return SecurityQuestionCollection::collection($data);
    }

}
