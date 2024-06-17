<?php

namespace App\Modules\Employees\Services;

use App\Modules\Users\Models\User as Employee;
use App\Modules\Users\Services\UserService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;

class EmployeeService extends UserService{
    public function all(): Collection
    {
        return Employee::with('roles')
        ->whereHas('roles', fn($q) => $q->whereNot('name', 'Super-Admin')
        ->whereNot('name', 'Student')
        ->whereNot('name', 'Institute')
        ->whereNot('name', 'Industry'))
        ->get();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = Employee::with('roles')
        ->whereHas('roles', fn($q) => $q->whereNot('name', 'Super-Admin')
        ->whereNot('name', 'Student')
        ->whereNot('name', 'Institute')
        ->whereNot('name', 'Industry'))
        ->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): Employee|null
    {
        return Employee::with('roles')
        ->whereHas('roles', fn($q) => $q->whereNot('name', 'Super-Admin')
        ->whereNot('name', 'Student')
        ->whereNot('name', 'Institute')
        ->whereNot('name', 'Industry'))
        ->findOrFail($id);
    }
}


class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(function($q) use($value){
            $q->where('name', 'LIKE', '%' . $value . '%')
            ->orWhere('email', 'LIKE', '%' . $value . '%')
            ->orWhere('phone', 'LIKE', '%' . $value . '%');
        });
    }
}
