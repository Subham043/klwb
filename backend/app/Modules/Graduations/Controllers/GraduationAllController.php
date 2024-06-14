<?php

namespace App\Modules\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Graduations\Resources\GraduationCollection;
use App\Modules\Graduations\Services\GraduationService;

class GraduationAllController extends Controller
{
    private $graduationService;

    public function __construct(GraduationService $graduationService)
    {
        $this->graduationService = $graduationService;
    }

    public function index(){
        $graduation = $this->graduationService->all();
        return response()->json(["message" => "Graduation fetched successfully.", "data" => GraduationCollection::collection($graduation)], 200);
    }
}