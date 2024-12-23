<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Enums\Guards;
use App\Modules\Admins\Fees\Requests\FeeCreateRequest;
use App\Modules\Admins\Fees\Resources\ExtendedFeeCollection;
use App\Modules\Admins\Fees\Services\FeeService;
use Illuminate\Support\Facades\DB;

class FeeCreateController extends Controller
{
    public function __construct(private FeeService $feeService){}

    /**
     * Create a new fee in the database.
     *
     * @param FeeCreateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(FeeCreateRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $fee = $this->feeService->create(
                [...$request->validated(), 'year'=>date('Y'), 'is_active' => 1, 'user_id' => auth()->guard(Guards::Admin->value())->user()->id]
            );
            return response()->json(["message" => "Fee created successfully.", "data" => ExtendedFeeCollection::make($fee)], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
