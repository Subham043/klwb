<?php

namespace App\Modules\ApplicationManagement\Fees\Services;

use App\Modules\ApplicationManagement\Fees\Models\Fee;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class FeeService
{

    public function all(): Collection
    {
        $query = Fee::with('classes')->whenNotAdmin()->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = Fee::with('classes')->whenNotAdmin()->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): Fee|null
    {
        return Fee::with('classes')->whenNotAdmin()->findOrFail($id);
    }

    public function create(array $data): Fee
    {
        return Fee::create($data);
    }

    public function update(array $data, Fee $fee): Fee
    {
        $fee->update($data);
        return $fee;
    }

    public function delete(Fee $fee): bool|null
    {
        return $fee->delete();
    }

}

class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(function($q) use($value){
            $q->where('amount', 'LIKE', '%' . $value . '%')
            ->orWhere('year', 'LIKE', '%' . $value . '%');
        });
    }
}
