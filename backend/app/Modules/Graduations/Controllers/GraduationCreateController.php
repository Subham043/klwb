<?php

namespace App\Modules\Graduations\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Graduations\Requests\GraduationRequest;
use App\Modules\Graduations\Resources\GraduationCollection;
use App\Modules\Graduations\Services\GraduationService;

class GraduationCreateController extends Controller
{
    private $graduationService;

    public function __construct(GraduationService $graduationService)
    {
        $this->graduationService = $graduationService;
    }

    public function index(GraduationRequest $request){
        try {
            //code...
            $graduation = $this->graduationService->create(
                $request->validated()
            );
            return response()->json(["message" => "Graduation created successfully.", "data" => GraduationCollection::make($graduation)], 201);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        }

    }
}