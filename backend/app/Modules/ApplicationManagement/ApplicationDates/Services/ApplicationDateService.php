<?php

namespace App\Modules\ApplicationManagement\ApplicationDates\Services;

use App\Modules\ApplicationManagement\ApplicationDates\Models\ApplicationDate;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class ApplicationDateService
{

    protected function model(): Builder
    {
        return ApplicationDate::whenNotAdmin();
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'application_year')
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

    public function getById(Int $id): ApplicationDate|null
    {
        return $this->model()->findOrFail($id);
    }

    public function create(array $data): ApplicationDate
    {
        return ApplicationDate::create($data);
    }

    public function update(array $data, ApplicationDate $applicationDate): ApplicationDate
    {
        $applicationDate->update($data);
        return $applicationDate;
    }

    public function delete(ApplicationDate $applicationDate): bool|null
    {
        return $applicationDate->delete();
    }

}

class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(function($q) use($value){
            $q->where('application_year', 'LIKE', '%' . $value . '%');
        });
    }
}
