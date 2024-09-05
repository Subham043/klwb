<?php

namespace App\Modules\Admins\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use Illuminate\Http\Request;

class RegisteredIndustryPaginateController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

    public function index(Request $request){
        $data = $this->industryService->paginate($request->total ?? 10);
        return RegisteredIndustryCollection::collection($data);
    }

}
