<?php

namespace App\Modules\Admins\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestInstitutes\Requests\RequestInstituteRequest;
use App\Modules\Admins\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\Admins\RequestInstitutes\Services\RequestInstituteService;
use Illuminate\Support\Facades\DB;

class RequestInstituteUpdateController extends Controller
{
    public function __construct(private RequestInstituteService $instituteService){}

    public function index(RequestInstituteRequest $request, $id){
        $institute = $this->instituteService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->instituteService->update(
                $request->except(['register_doc']),
                $institute
            );
            if($request->hasFile('register_doc')){
                $this->instituteService->saveRegisterDoc($institute);
            }
            return response()->json(["message" => "Request Institute updated successfully.", "data" => RequestInstituteCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
