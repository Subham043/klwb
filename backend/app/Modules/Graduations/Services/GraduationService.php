<?php

namespace App\Modules\Graduations\Services;

use App\Modules\Graduations\Models\Graduation;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class GraduationService
{

    public function all(): Collection
    {
        return Graduation::all();
    }

    public function paginateMain(Int $total = 10): LengthAwarePaginator
    {
        $query = Graduation::where('is_active', true);
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
        $query = Graduation::latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): Graduation|null
    {
        return Graduation::findOrFail($id);
    }

    public function create(array $data): Graduation
    {
        return Graduation::create($data);
    }

    public function update(array $data, Graduation $graduation): Graduation
    {
        $graduation->update($data);
        return $graduation;
    }

    public function delete(Graduation $graduation): bool|null
    {
        return $graduation->delete();
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