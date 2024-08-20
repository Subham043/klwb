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
use Spatie\SimpleExcel\SimpleExcelWriter;

class EmployeeService{

    protected $employee_roles = [Roles::SuperAdmin, Roles::Institute, Roles::InstituteStaff, Roles::Industry, Roles::IndustryStaff, Roles::Student];

    protected function model(): Builder
    {
        return Employee::doesNotHaveRoles($this->employee_roles);
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
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

    public function getById(Int $id)
    {
        return $this->model()->findOrFail($id);
    }

    public function getByEmail(String $email): Employee
    {
        return $this->model()->where('email', $email)->firstOrFail();
    }

    public function getByPhone(String $phone): Employee
    {
        return $this->model()->where('phone', $phone)->firstOrFail();
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

    public function excel() : SimpleExcelWriter
    {
        $model = $this->model();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('employees.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Name' => $data->name,
                'Email' => $data->email,
                'Phone' => $data->phone,
                'Role' => $data->currentRole,
                'Blocked' => $data->is_blocked ? 'Yes' : 'No',
                'Created At' => $data->created_at->format('Y-m-d H:i:s'),
            ]);
            if($i==1000){
                flush();
            }
            $i++;
        }
        return $writer;
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
