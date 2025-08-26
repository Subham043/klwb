<?php

namespace App\Modules\Admins\Industries\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Industries\Resources\IndustryCollection;
use App\Modules\Admins\Industries\Services\IndustryMainService;
use Illuminate\Http\Request;

class IndustryPaginateMainController extends Controller
{
    public function __construct(private IndustryMainService $industryService){}

    /**
     * Returns a paginated list of industries.
     *
     * @param Request $request
     * @return IndustryCollection
     */
    public function index(Request $request){
        $data = $this->industryService->paginate($request->total ?? 10);
        return IndustryCollection::collection($data);
    }

}
