<?php

namespace App\Modules\LocationManagement\Taluqs\Services;

use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class TaluqService
{

    public function all($city_id = null): Collection
    {
        $query = Taluq::with([
            'city' => function ($query) {
                $query->with('state');
            }
        ])->whenNotAdmin()->latest();
        if ($city_id) {
            $query->where('city_id', $city_id);
        }
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = Taluq::with([
            'city' => function ($query) {
                $query->with('state');
            }
        ])->whenNotAdmin()->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): Taluq|null
    {
        return Taluq::with([
            'city' => function ($query) {
                $query->with('state');
            }
        ])->whenNotAdmin()->findOrFail($id);
    }

    public function create(array $data): Taluq
    {
        return Taluq::create($data);
    }

    public function update(array $data, Taluq $taluq): Taluq
    {
        $taluq->update($data);
        return $taluq;
    }

    public function delete(Taluq $taluq): bool|null
    {
        return $taluq->delete();
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
