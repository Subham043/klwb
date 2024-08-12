<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use App\Modules\InstituteManagement\Institutes\Resources\InstituteRegisteredCollection;
use Illuminate\Support\Facades\DB;

class RegisteredToggleController extends Controller
{
    private $instituteService;

    public function __construct(InstituteRegisteredService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index($id){
        $institute = $this->instituteService->getById($id);
        DB::beginTransaction();
        try {
            $this->instituteService->toggleStatus($institute);
            if($institute->profile->is_blocked){
                return response()->json(["message" => "Institute Unblocked successfully.", "data" => InstituteRegisteredCollection::make($institute)], 200);
            }
            return response()->json(["message" => "Institute Blocked successfully.", "data" => InstituteRegisteredCollection::make($institute)], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
