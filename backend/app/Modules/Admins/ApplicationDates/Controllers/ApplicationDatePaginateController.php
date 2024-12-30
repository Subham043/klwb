<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;
use Illuminate\Http\Request;

class ApplicationDatePaginateController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    /**
     * Return a paginated list of all application dates
     *
     * @authenticated
     * @group Application Dates
     *
     * @queryParam total int The number of items to return per page. Defaults to 10.
     *
     * @responseFile responses/application_dates/paginate.json
     */
    public function index(Request $request){
        $data = $this->applicationDateService->paginate($request->total ?? 10);
        return ApplicationDateCollection::collection($data);
    }

}
