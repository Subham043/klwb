<?php

namespace App\Modules\Roles\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Roles\Resources\RoleCollection;
use App\Modules\Roles\Services\RoleService;

class RolePaginateController extends Controller
{
    private $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    public function get(){
        $data = $this->roleService->all();
        return response()->json(["message" => "Roles fetched successfully.", "data" => RoleCollection::collection($data)], 200);
    }

}