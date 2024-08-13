<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryRegisteredService;
use App\Modules\IndustryManagement\Industry\Resources\SingleIndustryAuthCollection;
use Illuminate\Support\Facades\DB;

class RegisteredToggleController extends Controller
{
    private $industryService;

    public function __construct(IndustryRegisteredService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index($id){
        $industry = $this->industryService->getById($id);
        DB::beginTransaction();
        try {
            $this->industryService->toggleStatus($industry);
            if($industry->is_blocked){
                return response()->json(["message" => "Industry Unblocked successfully.", "data" => SingleIndustryAuthCollection::make($industry)], 200);
            }
            return response()->json(["message" => "Industry Blocked successfully.", "data" => SingleIndustryAuthCollection::make($industry)], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
