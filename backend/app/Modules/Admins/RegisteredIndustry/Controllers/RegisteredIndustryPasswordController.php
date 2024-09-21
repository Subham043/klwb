<?php

namespace App\Modules\Admins\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Requests\RegisteredIndustryPasswordRequest;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use Illuminate\Support\Facades\DB;

class RegisteredIndustryPasswordController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    public function index(RegisteredIndustryPasswordRequest $request, $id){
        $industry = $this->industryService->getById($id);
        $request->validated();
        DB::beginTransaction();
        try {
            $this->industryService->updateAuthPassword([
                'password' => $request->password,
            ], $industry);
            return response()->json(["message" => "Registered Industry password updated successfully."], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
