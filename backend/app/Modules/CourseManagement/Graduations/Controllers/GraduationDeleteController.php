<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;

class GraduationDeleteController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    public function index($id){
        $graduation = $this->graduationService->getById($id);

        try {
            //code...
            $this->graduationService->delete(
                $graduation
            );
            return response()->json(["message" => "Graduation deleted successfully.", "data" => GraduationCollection::make($graduation)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }
    }

}
