<?php

namespace App\Modules\Admins\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Requests\RegisteredIndustryAuthRequest;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use Illuminate\Support\Facades\DB;

class RegisteredIndustryAuthController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    public function index(RegisteredIndustryAuthRequest $request, $id){
        $industry = $this->industryService->getById($id);
        $request->validated();
        DB::beginTransaction();
        try {
            $this->industryService->updateAuth([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ], $industry);
            return response()->json(["message" => "Registered Industry updated successfully.", "data" => RegisteredIndustryCollection::make($industry)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
