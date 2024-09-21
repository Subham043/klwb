<?php

namespace App\Modules\CourseManagement\Classes\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\CourseManagement\Classes\Models\Classes;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class ClassesService extends AbstractExcelService
{
    public function model(): Builder
    {
        return Classes::with([
            'course' => function ($query) {
                $query->with('graduation');
            }
        ])->whenNotAdmin();
    }
    public function query(): QueryBuilder
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

    public function excel() : SimpleExcelWriter
    {
        $model = $this->model();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('classes.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Name' => $data->name,
                'Course' => $data->course->name,
                'Course ID' => $data->course->id,
                'Graduataion' => $data->course->graduation->name,
                'Graduataion ID' => $data->graduation->id,
                'Active' => $data->is_active ? 'Yes' : 'No',
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
            ->orWhereHas('course', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%')
                ->orWhereHas('graduation', function($q) use($value){
                    $q->where('name', 'LIKE', '%' . $value . '%');
                });
            });
        });
    }
}
