<?php

namespace App\Modules\Cities\Services;

use App\Modules\Cities\Models\City;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class CityService
{

    public function all(): Collection
    {
        return City::all();
    }

    public function paginateMain(Int $total = 10): LengthAwarePaginator
    {
        $query = City::where('is_active', true);
        return QueryBuilder::for($query)
                ->defaultSort('id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = City::latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): City|null
    {
        return City::findOrFail($id);
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