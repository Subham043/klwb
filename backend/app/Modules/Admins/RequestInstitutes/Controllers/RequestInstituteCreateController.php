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

/**
 * Handle the creation of a new Request Institute.
 *
 * @param RequestInstituteRequest $request The request object containing the institute data.
 * @return \Illuminate\Http\JsonResponse A JSON response with a success or error message.
 *
 * This function initiates a database transaction and attempts to create a new 
 * Request Institute using the provided data from the request, excluding the 
 * 'register_doc'. If a 'register_doc' file is present in the request, it saves the 
 * document using the service. On success, it returns a JSON response with the 
 * created institute data and a success message. If an error occurs, the transaction 
 * is rolled back and a JSON response with an error message is returned. 
 * The transaction is committed in the end, regardless of the outcome.
 */

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
