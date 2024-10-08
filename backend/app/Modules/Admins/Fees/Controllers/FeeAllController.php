<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Fees\Resources\ExtendedFeeCollection;
use App\Modules\Admins\Fees\Services\FeeService;

class FeeAllController extends Controller
{
    public function __construct(private FeeService $feeService){}

    public function index(){
        $fee = $this->feeService->all();
        return response()->json(["message" => "Fee fetched successfully.", "data" => ExtendedFeeCollection::collection($fee)], 200);
    }
}
