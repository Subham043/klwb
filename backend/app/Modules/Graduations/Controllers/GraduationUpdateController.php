<?php

namespace App\Modules\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Graduations\Requests\GraduationRequest;
use App\Modules\Graduations\Resources\GraduationCollection;
use App\Modules\Graduations\Services\GraduationService;

class GraduationUpdateController extends Controller
{
    private $graduationService;

    public function __construct(GraduationService $graduationService)
    {
        $this->graduationService = $graduationService;
    }

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