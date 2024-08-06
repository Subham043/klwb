<?php

namespace App\Modules\Admins\Employees\Services;

use App\Modules\Admins\Employees\Models\Employee;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;

class EmployeeService{

    protected $employee_roles = [Roles::SuperAdmin, Roles::Institute, Roles::InstituteStaff, Roles::Industry, Roles::IndustryStaff, Roles::Student];

    public function all(): Collection
    {
        $query = Employee::doesNotHaveRoles($this->employee_roles)->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = Employee::doesNotHaveRoles($this->employee_roles)
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
        return Employee::doesNotHaveRoles($this->employee_roles)->findOrFail($id);
    }

    public function getByEmail(String $email): Employee
    {
        return Employee::doesNotHaveRoles($this->employee_roles)->where('email', $email)->firstOrFail();
    }

    public function getByPhone(String $phone): Employee
    {
        return Employee::doesNotHaveRoles($this->employee_roles)->where('phone', $phone)->firstOrFail();
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
        $employee->syncRoles($roles);
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
