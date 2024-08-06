<?php

namespace App\Modules\ApplicationManagement\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\ApplicationManagement\Fees\Requests\FeeCreateRequest;
use App\Modules\ApplicationManagement\Fees\Resources\FeeCollection;
use App\Modules\ApplicationManagement\Fees\Services\FeeService;

class FeeCreateController extends Controller
{
    private $feeService;

    public function __construct(FeeService $feeService)
    {
        $this->feeService = $feeService;
    }

    public function index(FeeCreateRequest $request){
        try {
            //code...
            $fee = $this->feeService->create(
                [...$request->validated(), 'year'=>date('Y'), 'user_id' => auth()->user()->id]
            );
            return response()->json(["message" => "Fee created successfully.", "data" => FeeCollection::make($fee)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
