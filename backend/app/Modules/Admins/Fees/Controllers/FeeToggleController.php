<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\Fees\Resources\ExtendedFeeCollection;
use App\Modules\Admins\Fees\Services\FeeService;
use Illuminate\Support\Facades\DB;

class FeeToggleController extends Controller
{
    public function __construct(private FeeService $feeService){}

    /**
     * Toggle the status of the fee.
     *
     * @param ToggleStatusRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ToggleStatusRequest $request, $id){
        $fee = $this->feeService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->feeService->toggleStatus($fee);
            if($fee->is_active){
                return response()->json(["message" => "Fee unblocked successfully.", "data" => ExtendedFeeCollection::make($fee)], 200);
            }
            return response()->json(["message" => "Fee blocked successfully.", "data" => ExtendedFeeCollection::make($fee)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
