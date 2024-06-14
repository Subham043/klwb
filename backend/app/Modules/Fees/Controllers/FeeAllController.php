<?php

namespace App\Modules\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Fees\Resources\FeeCollection;
use App\Modules\Fees\Services\FeeService;

class FeeAllController extends Controller
{
    private $feeService;

    public function __construct(FeeService $feeService)
    {
        $this->feeService = $feeService;
    }

    public function index(){
        $fee = $this->feeService->all();
        return response()->json(["message" => "Fee fetched successfully.", "data" => FeeCollection::collection($fee)], 200);
    }
}