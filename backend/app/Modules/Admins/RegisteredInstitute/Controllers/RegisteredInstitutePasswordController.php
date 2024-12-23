<?php

namespace App\Modules\Admins\RegisteredInstitute\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredInstitute\Requests\RegisteredInstitutePasswordRequest;
use App\Modules\Admins\RegisteredInstitute\Services\RegisteredInstituteService;
use Illuminate\Support\Facades\DB;

class RegisteredInstitutePasswordController extends Controller
{
    public function __construct(private RegisteredInstituteService $instituteService){}

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Modules\Admins\RegisteredInstitute\Requests\RegisteredInstitutePasswordRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function index(RegisteredInstitutePasswordRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        $request->validated();
        DB::beginTransaction();
        try {
            $this->instituteService->updateAuthPassword([
                'password' => $request->password,
            ], $institute);
            return response()->json(["message" => "Institute Registered password updated successfully."], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
