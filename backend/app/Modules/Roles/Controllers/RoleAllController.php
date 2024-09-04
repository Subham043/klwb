<?php

namespace App\Modules\Roles\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Roles\Resources\RoleCollection;
use App\Modules\Roles\Services\RoleService;

class RoleAllController extends Controller
{
    public function __construct(private RoleService $roleService){}

    public function index(){
        $data = $this->roleService->all();
        return response()->json(["message" => "Roles fetched successfully.", "data" => RoleCollection::collection($data)], 200);
    }

}
