<?php

namespace App\Modules\Admins\RequestInstitutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RequestInstitutes\Requests\RequestInstituteRequest;
use App\Modules\Admins\RequestInstitutes\Resources\RequestInstituteCollection;
use App\Modules\Admins\RequestInstitutes\Services\RequestInstituteService;
use Illuminate\Support\Facades\DB;

class RequestInstituteCreateController extends Controller
{
    public function __construct(private RequestInstituteService $instituteService){}

    public function index(RequestInstituteRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $institute = $this->instituteService->create(
                $request->except(['register_doc'])
            );
            if($request->hasFile('register_doc')){
                $this->instituteService->saveRegisterDoc($institute);
            }
            return response()->json(["message" => "Request Institute created successfully.", "data" => RequestInstituteCollection::make($institute)], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
