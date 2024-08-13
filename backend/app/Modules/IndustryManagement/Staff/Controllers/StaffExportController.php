<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryRegisteredService;
use App\Modules\IndustryManagement\Staff\Services\IndustryStaffService;

class StaffExportController extends Controller
{
    private $staffService;

    public function __construct(IndustryStaffService $staffService)
    {
        $this->staffService = $staffService;
    }

    public function index($id){
        $industry = (new IndustryRegisteredService)->getById($id);
        return $this->staffService->excel($industry->reg_industry_id, $industry->id)->toBrowser();
    }
}
