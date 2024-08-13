<?php

namespace App\Modules\IndustryManagement\Industry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Requests\RegisteredAuthRequest;
use App\Modules\IndustryManagement\Industry\Services\IndustryRegisteredService;
use App\Modules\IndustryManagement\Industry\Resources\SingleIndustryAuthCollection;
use Illuminate\Support\Facades\DB;

class RegisteredAuthController extends Controller
{
    private $industryService;

    public function __construct(IndustryRegisteredService $industryService)
    {
        $this->industryService = $industryService;
    }

    public function index(RegisteredAuthRequest $request, $id){
        $industry = $this->industryService->getById($id);
        $request->validated();
        DB::beginTransaction();
        try {
            $this->industryService->updateAuth([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'is_blocked' => $request->is_blocked,
            ], $industry);
            return response()->json(["message" => "Industry Registered updated successfully.", "data" => SingleIndustryAuthCollection::make($industry)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
