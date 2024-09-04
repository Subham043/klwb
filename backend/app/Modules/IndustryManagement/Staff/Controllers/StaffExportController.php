<?php

namespace App\Modules\IndustryManagement\Staff\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\IndustryManagement\Industry\Services\IndustryRegisteredService;
use App\Modules\IndustryManagement\Staff\Services\IndustryStaffService;

class StaffExportController extends Controller
{
    public function __construct(private IndustryStaffService $staffService){}

    public function index($id){
        $industry = (new IndustryRegisteredService)->getById($id);
        return $this->staffService->excel($industry->reg_industry_id, $industry->id)->toBrowser();
    }
}
