<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Fees\Resources\ExtendedFeeCollection;
use App\Modules\Admins\Fees\Services\FeeService;

class FeeAllController extends Controller
{
    public function __construct(private FeeService $feeService){}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(){
        $fee = $this->feeService->all();
        return response()->json(["message" => "Fee fetched successfully.", "data" => ExtendedFeeCollection::collection($fee)], 200);
    }
}
