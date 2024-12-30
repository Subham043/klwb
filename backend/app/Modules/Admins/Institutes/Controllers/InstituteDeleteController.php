<?php

namespace App\Modules\Admins\Institutes\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Institutes\Resources\InstituteCollection;
use App\Modules\Admins\Institutes\Services\InstituteService;
use Illuminate\Support\Facades\DB;

class InstituteDeleteController extends Controller
{
    public function __construct(private InstituteService $instituteService){}

    /**
     * Delete an Institute.
     *
     * @param int $id Institute ID.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index($id){
        $institute = $this->instituteService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $this->instituteService->delete(
                $institute
            );
            return response()->json(["message" => "Institute deleted successfully.", "data" => InstituteCollection::make($institute)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }

}
