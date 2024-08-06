<?php

namespace App\Modules\CourseManagement\Courses\Services;

use App\Modules\CourseManagement\Courses\Models\Course;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class CourseService
{

    public function all($graduation_id = null): Collection
    {
        $courses = Course::with('graduation')->checkAuth();
        if ($graduation_id) {
            $courses = $courses->where('graduation_id', $graduation_id);
        }
        return $courses->get();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = Course::with('graduation')->checkAuth()->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): Course|null
    {
        return Course::with('graduation')->checkAuth()->findOrFail($id);
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
