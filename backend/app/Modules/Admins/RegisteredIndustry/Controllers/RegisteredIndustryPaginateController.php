<?php

namespace App\Modules\Admins\RegisteredIndustry\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\RegisteredIndustry\Services\RegisteredIndustryService;
use App\Modules\Admins\RegisteredIndustry\Resources\RegisteredIndustryCollection;
use Illuminate\Http\Request;

class RegisteredIndustryPaginateController extends Controller
{
    public function __construct(private RegisteredIndustryService $industryService){}

/**
 * Handle the incoming request to paginate registered industries.
 *
 * @param Request $request The incoming HTTP request, which may contain a 'total' parameter for pagination.
 * @return RegisteredIndustryCollection A collection of paginated registered industries.
 */

    public function index(Request $request){
        $data = $this->industryService->paginate($request->total ?? 10);
        return RegisteredIndustryCollection::collection($data);
    }

}
