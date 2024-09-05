<?php

namespace App\Modules\Admins\RegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstitute\Resources\RegisteredInstituteCollection;
use Illuminate\Support\Facades\DB;

class RegisteredInstituteToggleController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    public function index($id){
        $institute = $this->instituteService->getById($id);
        DB::beginTransaction();
        try {
            $this->instituteService->toggleStatus($institute);
            if($institute->profile->is_blocked){
                return response()->json(["message" => "Institute Unblocked successfully.", "data" => RegisteredInstituteCollection::make($institute)], 200);
            }
            return response()->json(["message" => "Institute Blocked successfully.", "data" => RegisteredInstituteCollection::make($institute)], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}