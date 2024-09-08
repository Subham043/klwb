<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Fees\Requests\FeeCreateRequest;
use App\Modules\Admins\Fees\Resources\ExtendedFeeCollection;
use App\Modules\Admins\Fees\Services\FeeService;

class FeeCreateController extends Controller
{
    public function __construct(private FeeService $feeService){}

    public function index(FeeCreateRequest $request){
        try {
            //code...
            $fee = $this->feeService->create(
                [...$request->validated(), 'year'=>date('Y'), 'user_id' => auth()->guard(Guards::Admin->value())->user()->id]
            );
            return response()->json(["message" => "Fee created successfully.", "data" => ExtendedFeeCollection::make($fee)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
