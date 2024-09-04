<?php

namespace App\Modules\ApplicationManagement\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Fees\Resources\FeeCollection;
use App\Modules\ApplicationManagement\Fees\Services\FeeService;

class FeeAllController extends Controller
{
    public function __construct(private FeeService $feeService){}

    public function index(){
        $fee = $this->feeService->all();
        return response()->json(["message" => "Fee fetched successfully.", "data" => FeeCollection::collection($fee)], 200);
    }
}
