<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Services;

use App\Modules\InstituteManagement\RegisteredInstitutes\Models\RegisteredInstitute;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class RegisteredInstituteService
{

    public function all($taluq_id = null): Collection
    {
        $query = RegisteredInstitute::with([
            'taluq' => function ($query) {
                $query->with([
                    'city' => function ($qry) {
                        $qry->with('state');
                    }
                ]);
            }
        ])->whenNotAdmin()->latest();
        if ($taluq_id) {
            $query->where('taluq_id', $taluq_id);
        }
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = RegisteredInstitute::with([
            'taluq' => function ($query) {
                $query->with([
                    'city' => function ($qry) {
                        $qry->with('state');
                    }
                ]);
            }
        ])->whenNotAdmin()->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): RegisteredInstitute|null
    {
        return RegisteredInstitute::with([
            'taluq' => function ($query) {
                $query->with([
                    'city' => function ($qry) {
                        $qry->with('state');
                    }
                ]);
            }
        ])->whenNotAdmin()->findOrFail($id);
    }

    public function create(array $data): RegisteredInstitute
    {
        return RegisteredInstitute::create($data);
    }

    public function update(array $data, RegisteredInstitute $registeredInstitute): RegisteredInstitute
    {
        $registeredInstitute->update($data);
        return $registeredInstitute;
    }

    public function delete(RegisteredInstitute $registeredInstitute): bool|null
    {
        return $registeredInstitute->delete();
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
