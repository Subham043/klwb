<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Requests\GraduationRequest;
use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;

class GraduationUpdateController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    public function index(GraduationRequest $request, $id){
        $graduation = $this->graduationService->getById($id);
        try {
            //code...
            $this->graduationService->update(
                $request->validated(),
                $graduation
            );
            return response()->json(["message" => "Graduation updated successfully.", "data" => GraduationCollection::make($graduation)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
