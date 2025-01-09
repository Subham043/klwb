<?php

namespace App\Modules\Admins\Contributions\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Admins\Contributions\Requests\ContributionRequest;
use App\Modules\Admins\Contributions\Resources\ContributionCollection;
use App\Modules\Admins\Contributions\Services\ContributionService;
use Illuminate\Support\Facades\DB;

class ContributionUpdateController extends Controller
{
    public function __construct(private ContributionService $contributionService){}

    /**
     * Display the specified contribution.
     *
     * @param int $id The ID of the contribution to fetch.
     * @return \Illuminate\Http\JsonResponse
     */

    public function index(ContributionRequest $request, $id){
        $contribution = $this->contributionService->getById($id);
        DB::beginTransaction();
        try {
            //code...
            $contribution->update(
                [...$request->validated(), 'is_edited' => true],
            );
            $contribution->refresh();
            return response()->json(["message" => "Contribution updated successfully.", "data" => ContributionCollection::make($contribution)], 200);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(["message" => "Something went wrong. Please try again"], 400);
        } finally {
            DB::commit();
        }
    }
}
