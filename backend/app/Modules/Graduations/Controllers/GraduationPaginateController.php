<?php

namespace App\Modules\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Graduations\Resources\GraduationCollection;
use App\Modules\Graduations\Services\GraduationService;
use Illuminate\Http\Request;

class GraduationPaginateController extends Controller
{
    private $graduationService;

    public function __construct(GraduationService $graduationService)
    {
        $this->graduationService = $graduationService;
    }

    public function index(Request $request){
        $data = $this->graduationService->paginate($request->total ?? 10);
        return GraduationCollection::collection($data);
    }

}