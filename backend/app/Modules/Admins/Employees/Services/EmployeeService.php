<?php

namespace App\Modules\Admins\Employees\Services;

use App\Modules\Admins\Employees\Models\Employee;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;

class EmployeeService{
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

    public function getById(Int $id)
    {
        return Employee::with('roles')
        ->whereHas('roles', fn($q) => $q->whereNot('name', 'Super-Admin')
        ->whereNot('name', 'Student')
        ->whereNot('name', 'Institute')
        ->whereNot('name', 'Industry'))
        ->findOrFail($id);
    }

    public function getByEmail(String $email): Employee
    {
        return Employee::with('roles')
        ->whereHas('roles', fn($q) => $q->whereNot('name', 'Super-Admin')
        ->whereNot('name', 'Student')
        ->whereNot('name', 'Institute')
        ->whereNot('name', 'Industry'))->where('email', $email)->firstOrFail();
    }

    public function getByPhone(String $phone): Employee
    {
        return Employee::with('roles')
        ->whereHas('roles', fn($q) => $q->whereNot('name', 'Super-Admin')
        ->whereNot('name', 'Student')
        ->whereNot('name', 'Institute')
        ->whereNot('name', 'Industry'))->where('phone', $phone)->firstOrFail();
    }

    public function create(array $data): Employee
    {
        $employee = Employee::create([...$data, 'otp' => rand (1111, 9999)]);
        return $employee;
    }

    public function update(array $data, Employee $employee): Employee
    {
        $employee->update($data);
        return $employee;
    }

    public function syncRoles(array $roles = [], Employee $employee): void
    {
        $employee->roles()->syncWithPivotValues($roles, ['guard' => 'admin']);
    }

    public function delete(Employee $employee): bool|null
    {
        return $employee->delete();
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
