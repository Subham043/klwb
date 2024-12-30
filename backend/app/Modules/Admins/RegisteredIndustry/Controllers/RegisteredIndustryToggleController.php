<?php

namespace App\Modules\Admins\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use Illuminate\Support\Facades\DB;

class RegisteredIndustryToggleController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

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
            $this->industryService->toggleStatus($industry);
            if($industry->is_blocked){
                return response()->json(["message" => "Industry Unblocked successfully.", "data" => RegisteredIndustryCollection::make($industry)], 200);
            }
            return response()->json(["message" => "Industry Blocked successfully.", "data" => RegisteredIndustryCollection::make($industry)], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
