<?php

namespace App\Modules\InstituteManagement\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\InstituteManagement\Institutes\Requests\RegisteredAuthRequest;
use App\Modules\InstituteManagement\Institutes\Services\InstituteRegisteredService;
use App\Modules\InstituteManagement\Institutes\Resources\InstituteRegisteredCollection;
use Illuminate\Support\Facades\DB;

class RegisteredAuthController extends Controller
{
    private $instituteService;

    public function __construct(InstituteRegisteredService $instituteService)
    {
        $this->instituteService = $instituteService;
    }

    public function index(RegisteredAuthRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        $request->validated();
        DB::beginTransaction();
        try {
            $institute->profile->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'is_blocked' => $request->is_blocked,
            ]);
            $institute->registered_institute->update([
                'is_active' => !$request->is_blocked,
            ]);
            $institute->refresh();
            return response()->json(["message" => "Institute Registered updated successfully.", "data" => InstituteRegisteredCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
