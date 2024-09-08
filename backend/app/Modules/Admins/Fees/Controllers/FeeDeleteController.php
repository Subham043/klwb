<?php

namespace App\Modules\Admins\Fees\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Fees\Resources\ExtendedFeeCollection;
use App\Modules\Admins\Fees\Services\FeeService;

class FeeDeleteController extends Controller
{
    public function __construct(private FeeService $feeService){}

    public function index($id){
        $fee = $this->feeService->getById($id);

        try {
            //code...
            $this->feeService->delete(
                $fee
            );
            return response()->json(["message" => "Fee deleted successfully.", "data" => ExtendedFeeCollection::make($fee)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
