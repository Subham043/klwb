<?php

namespace App\Modules\SecurityQuestions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\SecurityQuestions\Resources\SecurityQuestionCollection;
use App\Modules\SecurityQuestions\Services\SecurityQuestionService;
use Illuminate\Http\Request;

class SecurityQuestionPaginateController extends Controller
{
    private $stateService;

    public function __construct(SecurityQuestionService $stateService)
    {
        $this->stateService = $stateService;
    }

    public function index(Request $request){
        $data = $this->stateService->paginate($request->total ?? 10);
        return SecurityQuestionCollection::collection($data);
    }

}
