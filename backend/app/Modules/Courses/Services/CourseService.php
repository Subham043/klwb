<?php

namespace App\Modules\Courses\Services;

use App\Modules\Courses\Models\Course;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class CourseService
{

    public function all(): Collection
    {
        return Course::all();
    }

    public function paginateMain(Int $total = 10): LengthAwarePaginator
    {
        $query = Course::where('is_active', true);
        return QueryBuilder::for($query)
                ->defaultSort('id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = Course::latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): Course|null
    {
        return Course::findOrFail($id);
    }

    public function create(array $data): Course
    {
        return Course::create($data);
    }

    public function update(array $data, Course $course): Course
    {
        $course->update($data);
        return $course;
    }

    public function delete(Course $course): bool|null
    {
        return $course->delete();
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