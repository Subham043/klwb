<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;
use Illuminate\Http\Request;

class GraduationPaginateController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    public function index(Request $request){
        $data = $this->graduationService->paginate($request->total ?? 10);
        return GraduationCollection::collection($data);
    }

}
