<?php

namespace App\Modules\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Fees\Resources\FeeCollection;
use App\Modules\Fees\Services\FeeService;
use Illuminate\Http\Request;

class FeePaginateController extends Controller
{
    private $feeService;

    public function __construct(FeeService $feeService)
    {
        $this->feeService = $feeService;
    }

    public function index(Request $request){
        $data = $this->feeService->paginate($request->total ?? 10);
        return FeeCollection::collection($data);
    }

}
