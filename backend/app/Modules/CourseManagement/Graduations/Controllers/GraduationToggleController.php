<?php

namespace App\Modules\CourseManagement\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ToggleStatusRequest;
use App\Modules\CourseManagement\Graduations\Resources\GraduationCollection;
use App\Modules\CourseManagement\Graduations\Services\GraduationService;

class GraduationToggleController extends Controller
{
    public function __construct(private GraduationService $graduationService){}

    /**
     * Toggle the status of a graduation.
     * 
     * @param ToggleStatusRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function index(ToggleStatusRequest $request, $id){
        $graduation = $this->graduationService->getById($id);
        try {
            //code...
            $this->graduationService->toggleStatus($graduation);
            if($graduation->is_active){
                return response()->json(["message" => "Graduation unblocked successfully.", "data" => GraduationCollection::make($graduation)], 200);
            }
            return response()->json(["message" => "Graduation blocked successfully.", "data" => GraduationCollection::make($graduation)], 200);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}
