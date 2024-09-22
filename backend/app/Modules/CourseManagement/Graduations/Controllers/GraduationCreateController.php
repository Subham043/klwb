<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Requests\GraduationRequest;
use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;

class GraduationCreateController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    public function index(GraduationRequest $request){
        try {
            //code...
            $graduation = $this->graduationService->create(
                [...$request->validated(), 'is_active' => 1]
            );
            return response()->json(["message" => "Graduation created successfully.", "data" => GraduationCollection::make($graduation)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
