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
    protected function model(): Builder
    {
        return Fee::with('classes')->whenNotAdmin();
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'year')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ]);
    }

    public function all(): Collection
    {
        return $this->query()->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        return $this->query()->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): Fee|null
    {
        return $this->model()->findOrFail($id);
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
