<?php

namespace App\Modules\Taluqs\Services;

use App\Modules\Taluqs\Models\Taluq;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class TaluqService
{

    public function all(): Collection
    {
        return Taluq::with([
            'city' => function ($query) {
                $query->with('state');
            }
        ])->get();
    }

    public function paginateMain(Int $total = 10): LengthAwarePaginator
    {
        $query = Taluq::with([
            'city' => function ($query) {
                $query->with('state');
            }
        ])->where('is_active', true);
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
        $query = Taluq::with([
            'city' => function ($query) {
                $query->with('state');
            }
        ])->latest();
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
        ])->findOrFail($id);
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
