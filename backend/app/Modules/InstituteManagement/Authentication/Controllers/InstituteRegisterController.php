<?php

namespace App\Modules\InstituteManagement\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Events\UserRegistered;
use App\Http\Services\RateLimitService;
use App\Modules\InstituteManagement\Authentication\Requests\InstituteRegisterPostRequest;
use App\Modules\InstituteManagement\Authentication\Resources\AuthCollection;
use App\Modules\InstituteManagement\Institutes\Services\InstituteAuthService;
use App\Modules\LocationManagement\Cities\Services\CityService;
use Illuminate\Support\Facades\DB;

class InstituteRegisterController extends Controller
{
    private InstituteAuthService $instituteAuthService;

    public function __construct(InstituteAuthService $instituteAuthService)
    {
        $this->instituteAuthService = $instituteAuthService;
    }

    public function index(InstituteRegisterPostRequest $request){
        $request->validated();
        DB::beginTransaction();
        try {
            //code...
            $institute = $this->instituteAuthService->createInstitute([
                'principal' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'reg_institute_id' => $request->reg_institute_id,
            ]);
            if($request->hasFile('reg_certification')){
                $this->instituteAuthService->saveRegCertification($institute);
            }
            if($request->hasFile('principal_signature')){
                $this->instituteAuthService->savePrincipalSignature($institute);
            }
            if($request->hasFile('seal')){
                $this->instituteAuthService->saveSeal($institute);
            }
            $instituteAuth = $this->instituteAuthService->createInstituteAuth([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => $request->password,
                'school_id' => $institute->id,
            ]);
            $this->instituteAuthService->syncRoles(["Institute"], $instituteAuth);
            $city = (new CityService)->getById($request->city_id);
            $this->instituteAuthService->createInstituteAddress([
                'address' => $request->address,
                'state_id' => $city->state_id,
                'city_id' => $request->city_id,
                'taluq_id' => $request->taluq_id,
                'pincode' => $request->pincode,
                'school_id' => $institute->id,
            ]);
            UserRegistered::dispatch($instituteAuth);
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'message' => 'Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.',
                'user' => AuthCollection::make($instituteAuth),
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
