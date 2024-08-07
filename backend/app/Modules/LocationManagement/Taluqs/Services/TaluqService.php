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

    protected function model(): Builder
    {
        return Taluq::with([
            'city' => function ($query) {
                $query->with('state');
            }
        ])->whenNotAdmin();
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('has_city', function (Builder $query, $value) {
                        $query->where('city_id', $value);
                    })
                ]);
    }

    public function all(): Collection
    {
        return $this->query()->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        return $this->query()
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): Taluq|null
    {
        return $this->model()->findOrFail($id);
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
