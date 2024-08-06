<?php

namespace App\Modules\LocationManagement\Cities\Services;

use App\Modules\LocationManagement\Cities\Models\City;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class CityService
{

    public function all($state_id = null): Collection
    {
        $query = City::with('state')->whenNotAdmin()->latest();
        if ($state_id) {
            $query->where('state_id', $state_id);
        }
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = City::with('state')->whenNotAdmin()->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): City|null
    {
        return City::with('state')->whenNotAdmin()->findOrFail($id);
    }

    public function create(array $data): City
    {
        return City::create($data);
    }

    public function update(array $data, City $city): City
    {
        $city->update($data);
        return $city;
    }

    public function delete(City $city): bool|null
    {
        return $city->delete();
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
