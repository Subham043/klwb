<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Fees\Resources\ExtendedFeeCollection;
use App\Modules\Admins\Fees\Services\FeeService;
use Illuminate\Support\Facades\DB;

class FeeDeleteController extends Controller
{
    public function __construct(private FeeService $feeService){}

    /**
     * Delete a fee by its id
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $fee = $this->feeService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->feeService->delete(
                $fee
            );
            return response()->json(["message" => "Fee deleted successfully.", "data" => ExtendedFeeCollection::make($fee)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }

}
