<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Services\FileService;
use App\Modules\Admins\Contributions\Requests\ContributionExcelUploadRequest;
use App\Modules\Admins\Contributions\Resources\ContributionCollection;
use App\Modules\Admins\Contributions\Services\AttemptedContributionService;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Illuminate\Support\Facades\DB;

class AttemptedContributionExcelUploadController extends Controller
{
    public function __construct(private AttemptedContributionService $contributionService){}

    /**
     * Display the specified contribution.
     *
     * @param int $id The ID of the contribution to fetch.
     * @return \Illuminate\Http\JsonResponse
     */

    public function index(ContributionExcelUploadRequest $request, $id){
        $request->validated();
        $contribution = $this->contributionService->getById($id);
        if($contribution->employee_excel_link){
            return response()->json(["message" => "Excel already exists."], 400);
        }
        DB::beginTransaction();
        try {
            //code...
            $file = (new FileService)->save_file('employee_excel', (new Payment())->employee_excel_path);
            $contribution->update(
                ['employee_excel' => $file],
            );
            $contribution->refresh();
            return response()->json(["message" => "Contribution excel uploaded successfully.", "data" => ContributionCollection::make($contribution)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
