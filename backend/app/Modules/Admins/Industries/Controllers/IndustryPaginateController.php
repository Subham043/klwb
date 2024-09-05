<?php

namespace App\Modules\Admins\Industries\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Industries\Resources\IndustryCollection;
use App\Modules\Admins\Industries\Services\IndustryService;
use Illuminate\Http\Request;

class IndustryPaginateController extends Controller
{
    public function __construct(private IndustryService $industryService){}

    public function index(Request $request){
        $data = $this->industryService->paginate($request->total ?? 10);
        return IndustryCollection::collection($data);
    }

}
