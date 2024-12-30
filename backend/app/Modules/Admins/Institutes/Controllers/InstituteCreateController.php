<?php

namespace App\Modules\Admins\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Institutes\Requests\InstituteRequest;
use App\Modules\Admins\Institutes\Resources\InstituteCollection;
use App\Modules\Admins\Institutes\Services\InstituteService;
use Illuminate\Support\Facades\DB;

class InstituteCreateController extends Controller
{
    public function __construct(private InstituteService $instituteService){}

    /**
     * Create a new Institute.
     *
     * @bodyParam name string required Institute name. Example: Test Institute
     * @bodyParam email string required Institute email. Example: test@example.com
     * @bodyParam phone string required Institute phone. Example: 9876543210
     * @bodyParam address string required Institute address. Example: Test Address
     * @bodyParam taluq_id integer required Taluq ID. Example: 1
     * @bodyParam register_doc string required Institute registration document. Example: test.pdf
     * @response {
     *  "message": "Institute created successfully.",
     *  "data": {
     *      "id": 1,
     *      "name": "Test Institute",
     *      "email": "test@example.com",
     *      "phone": "9876543210",
     *      "address": "Test Address",
     *      "taluq_id": 1,
     *      "register_doc": "test.pdf"
     *  }
     * }
     */
    public function index(InstituteRequest $request){
        DB::beginTransaction();
        try {
            //code...
            $institute = $this->instituteService->create(
                [...$request->validated(), 'is_active' => 1]
            );
            return response()->json(["message" => "Institute created successfully.", "data" => InstituteCollection::make($institute)], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }

    }
}
