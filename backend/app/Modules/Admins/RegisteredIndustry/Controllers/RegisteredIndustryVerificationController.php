<?php

namespace App\Modules\Admins\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use Illuminate\Support\Facades\DB;

class RegisteredIndustryVerificationController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    /**
     * Verify the specified industry.
     *
     * @param ToggleStatusRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ToggleStatusRequest $request, $id){
        $industry = $this->industryService->getById($id);
        if($industry->verified_at){
            return response()->json(["message" => "Industry already verified."], 400);
        }
        DB::beginTransaction();
        try {
            $industry->update(['verified_at'=>now()]);
            $industry->refresh();
            return response()->json(["message" => "Industry verified successfully.", "data" => RegisteredIndustryCollection::make($industry)], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
