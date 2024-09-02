<?php

namespace App\Modules\IndustryManagement\Authentication\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Events\UserRegistered;
use App\Http\Services\RateLimitService;
use App\Modules\IndustryManagement\Authentication\Requests\IndustryRegisterPostRequest;
use App\Modules\IndustryManagement\Authentication\Resources\AuthCollection;
use App\Modules\IndustryManagement\Industry\Services\IndustryAuthService;
use App\Modules\LocationManagement\Cities\Services\CityService;
use Illuminate\Support\Facades\DB;

class IndustryRegisterController extends Controller
{
    private IndustryAuthService $industryAuthService;

    public function __construct(IndustryAuthService $industryAuthService)
    {
        $this->industryAuthService = $industryAuthService;
    }

    public function index(IndustryRegisterPostRequest $request){
        $request->validated();
        DB::beginTransaction();
        try {
            //code...
            $city = (new CityService)->getById($request->city_id);
            $industry = $this->industryAuthService->create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => $request->password,
                'reg_industry_id' => $request->reg_industry_id,
                'address' => $request->address,
                'city_id' => $request->city_id,
                'taluq_id' => $request->taluq_id,
            ]);
            if($request->hasFile('reg_doc')){
                $this->industryAuthService->saveRegDoc($industry);
            }
            if($request->hasFile('sign')){
                $this->industryAuthService->saveSign($industry);
            }
            if($request->hasFile('seal')){
                $this->industryAuthService->saveSeal($industry);
            }
            $this->industryAuthService->syncRoles(["Industry"], $industry);
            $industry->registered_industry->update([
                'act' => $request->act,
                'state_id' => $city->state_id,
                'city_id' => $request->city_id,
                'taluq_id' => $request->taluq_id,
            ]);
            UserRegistered::dispatch($industry);
            (new RateLimitService($request))->clearRateLimit();
            return response()->json([
                'message' => 'Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn\'t receive the email, we will gladly send you another.',
                'user' => AuthCollection::make($industry),
            ], 201);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
