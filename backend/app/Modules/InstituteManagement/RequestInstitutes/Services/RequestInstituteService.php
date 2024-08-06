<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Services;

use App\Http\Services\FileService;
use App\Modules\InstituteManagement\RequestInstitutes\Models\RequestInstitute;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class RequestInstituteService
{

    public function all($taluq_id = null): Collection
    {
        $requestInstitutes = RequestInstitute::with([
            'taluq' => function ($query) {
                $query->with([
                    'city' => function ($qry) {
                        $qry->with('state');
                    }
                ]);
            }
        ])->checkAuth();
        if ($taluq_id) {
            $requestInstitutes->where('taluq_id', $taluq_id);
        }
        return $requestInstitutes->get();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = RequestInstitute::with([
            'taluq' => function ($query) {
                $query->with([
                    'city' => function ($qry) {
                        $qry->with('state');
                    }
                ]);
            }
        ])->checkAuth()->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): RequestInstitute|null
    {
        return RequestInstitute::with([
            'taluq' => function ($query) {
                $query->with([
                    'city' => function ($qry) {
                        $qry->with('state');
                    }
                ]);
            }
        ])->checkAuth()->findOrFail($id);
    }

    public function create(array $data): RequestInstitute
    {
        return RequestInstitute::create($data);
    }

    public function saveRegisterDoc(RequestInstitute $requestInstitute): RequestInstitute
    {
        $register_doc = (new FileService)->save_file('register_doc', (new RequestInstitute)->register_doc_path);
        return $this->update([
            'register_doc' => $register_doc,
        ], $requestInstitute);
    }

    public function update(array $data, RequestInstitute $requestInstitute): RequestInstitute
    {
        $requestInstitute->update($data);
        return $requestInstitute;
    }

    public function delete(RequestInstitute $requestInstitute): bool|null
    {
        return $requestInstitute->delete();
    }

}

class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(function($q) use($value){
            $q->where('name', 'LIKE', '%' . $value . '%');
        });
    }
}
