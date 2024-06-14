<?php

namespace App\Modules\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Fees\Requests\FeeRequest;
use App\Modules\Fees\Resources\FeeCollection;
use App\Modules\Fees\Services\FeeService;

class FeeCreateController extends Controller
{
    private $feeService;

    public function __construct(FeeService $feeService)
    {
        $this->feeService = $feeService;
    }

    public function index(FeeRequest $request){
        try {
            //code...
            $fee = $this->feeService->create(
                [...$request->validated(), 'user_id' => auth()->user()->id]
            );
            return response()->json(["message" => "Fee created successfully.", "data" => FeeCollection::make($fee)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}