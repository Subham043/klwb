<?php

namespace App\Modules\ApplicationManagement\ApplicationDates\Services;

use App\Modules\ApplicationManagement\ApplicationDates\Models\ApplicationDate;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class ApplicationDateService
{

    public function all(): Collection
    {
        return ApplicationDate::checkAuth()->get();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = ApplicationDate::checkAuth()->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): ApplicationDate|null
    {
        return ApplicationDate::checkAuth()->findOrFail($id);
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
