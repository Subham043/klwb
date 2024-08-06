<?php

namespace App\Modules\CourseManagement\Classes\Services;

use App\Modules\CourseManagement\Classes\Models\Classes;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class ClassesService
{

    public function all($course_id = null): Collection
    {
        $query = Classes::with([
            'course' => function ($query) {
                $query->with('graduation');
            }
        ])->whenNotAdmin()->latest();
        if ($course_id) {
            $query->where('course_id', $course_id);
        }
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = Classes::with([
            'course' => function ($query) {
                $query->with('graduation');
            }
        ])->whenNotAdmin()->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): Classes|null
    {
        return Classes::with([
            'course' => function ($query) {
                $query->with('graduation');
            }
        ])->whenNotAdmin()->findOrFail($id);
    }

    public function create(array $data): Classes
    {
        return Classes::create($data);
    }

    public function update(array $data, Classes $classes): Classes
    {
        $classes->update($data);
        return $classes;
    }

    public function delete(Classes $classes): bool|null
    {
        return $classes->delete();
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
