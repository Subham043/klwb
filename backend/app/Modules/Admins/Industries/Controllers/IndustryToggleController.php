<?php

namespace App\Modules\Admins\Industries\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\Industries\Resources\IndustryCollection;
use App\Modules\Admins\Industries\Services\IndustryService;
use Illuminate\Support\Facades\DB;

class IndustryToggleController extends Controller
{
    public function __construct(private IndustryService $industryService){}

    /**
     * Toggle the status of a industry.
     *
     * @param ToggleStatusRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ToggleStatusRequest $request, $id){
        $industry = $this->industryService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->industryService->toggleStatus($industry);
            if($industry->is_active){
                return response()->json(["message" => "Industry unblocked successfully.", "data" => IndustryCollection::make($industry)], 200);
            }
            return response()->json(["message" => "Industry blocked successfully.", "data" => IndustryCollection::make($industry)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
