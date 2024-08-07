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
    protected function model(): Builder
    {
        return Classes::with([
            'course' => function ($query) {
                $query->with('graduation');
            }
        ])->whenNotAdmin();
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('has_course', function (Builder $query, $value) {
                        $query->where('course_id', $value);
                    })
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

    public function getById(Int $id): Classes|null
    {
        return $this->model()->findOrFail($id);
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
