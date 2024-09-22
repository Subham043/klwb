<?php

namespace App\Modules\Admins\RegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use App\Modules\Admins\RegisteredInstitute\Resources\RegisteredInstituteCollection;
use Illuminate\Support\Facades\DB;

class RegisteredInstituteVerificationController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    public function index(ToggleStatusRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        if($institute->profile->verified_at){
            return response()->json(["message" => "Institute already verified."], 400);
        }
        DB::beginTransaction();
        try {
            $institute->profile->update(['verified_at'=>now()]);
            $institute->refresh();
            return response()->json(["message" => "Institute verified successfully.", "data" => RegisteredInstituteCollection::make($institute)], 200);
         } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
