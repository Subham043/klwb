<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Fees\Requests\FeeUpdateRequest;
use App\Modules\Admins\Fees\Resources\ExtendedFeeCollection;
use App\Modules\Admins\Fees\Services\FeeService;
use Illuminate\Support\Facades\DB;

class FeeUpdateController extends Controller
{
    public function __construct(private FeeService $feeService){}

    /**
     * Update a fee by its id
     *
     * @param FeeUpdateRequest $request
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(FeeUpdateRequest $request, $id){
        $fee = $this->feeService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->feeService->update(
                $request->validated(),
                $fee
            );
            return response()->json(["message" => "Fee updated successfully.", "data" => ExtendedFeeCollection::make($fee)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
