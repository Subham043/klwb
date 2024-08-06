<?php

namespace App\Modules\LocationManagement\States\Services;

use App\Modules\LocationManagement\States\Models\State;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class StateService
{

    public function all(): Collection
    {
        $query = State::whenNotAdmin()->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = State::whenNotAdmin()->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): State|null
    {
        return State::whenNotAdmin()->findOrFail($id);
    }

    public function create(array $data): State
    {
        return State::create($data);
    }

    public function update(array $data, State $state): State
    {
        $state->update($data);
        return $state;
    }

    public function delete(State $state): bool|null
    {
        return $state->delete();
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
