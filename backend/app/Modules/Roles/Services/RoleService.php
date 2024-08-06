<?php

namespace App\Modules\Roles\Services;

use App\Modules\Roles\Enums\Roles;
use Spatie\Permission\Models\Role;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\AllowedFilter;

class RoleService
{
    protected $employee_roles = [Roles::SuperAdmin, Roles::Institute, Roles::InstituteStaff, Roles::Industry, Roles::IndustryStaff, Roles::Student];
    public function all(): Collection
    {
        return Role::whereNotIn('name', $this->employee_roles)->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = Role::whereNotIn('name', $this->employee_roles)->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total);
    }

}

class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where('name', 'LIKE', '%' . $value . '%');
    }
}
