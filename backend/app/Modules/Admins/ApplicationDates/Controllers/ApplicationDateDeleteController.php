<?php

namespace App\Modules\Admins\ApplicationDates\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\ApplicationDates\Resources\ApplicationDateCollection;
use App\Modules\Admins\ApplicationDates\Services\ApplicationDateService;
use Illuminate\Support\Facades\DB;

class ApplicationDateDeleteController extends Controller
{
    public function __construct(private ApplicationDateService $applicationDateService){}

    /**
     * Delete the specified ApplicationDate from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function index($id){
        $applicationDate = $this->applicationDateService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->applicationDateService->delete(
                $applicationDate
            );
            return response()->json(["message" => "Application Date deleted successfully.", "data" => ApplicationDateCollection::make($applicationDate)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }

}
