<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Fees\Resources\ExtendedFeeCollection;
use App\Modules\Admins\Fees\Services\FeeService;

class FeeViewController extends Controller
{
    public function __construct(private FeeService $feeService){}

    public function index($id){
        $fee = $this->feeService->getById($id);
        return response()->json(["message" => "Fee fetched successfully.", "data" => ExtendedFeeCollection::make($fee)], 200);
    }
}
