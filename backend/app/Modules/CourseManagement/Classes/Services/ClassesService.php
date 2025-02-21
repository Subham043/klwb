<?php

namespace App\Modules\CourseManagement\Classes\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\CourseManagement\Classes\Models\Classes;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\Paginator;
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
        ])->isActive();
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('has_graduation', function (Builder $query, $value) {
                        $query->where(function ($query) use ($value) {
                            $query->whereHas('course', function ($qry) use ($value) {
                                $qry->where('graduation_id', $value);
                            });
                        });
                    }),
                    AllowedFilter::callback('has_course', function (Builder $query, $value) {
                        $query->where(function ($query) use ($value) {
                            $query->where('course_id', $value);
                        });
                    }),
                    AllowedFilter::callback('active_status', function (Builder $query, $value) {
                        $query->where(function ($query) use ($value) {
                            if(!empty($value) && request()->user() && request()->user()->hasRole('Super-Admin|Admin')){
                                if(strtolower($value)=="active"){
                                    $query->where('is_active', true);
                                }else{
                                    $query->where('is_active', false);
                                }
                            }
                        });
                    }),
                ]);
    }

    public function getExcelQuery(): QueryBuilder
	{
		return $this->query();
	}

    public function toggleStatus(Classes $data): Classes
    {
        $this->update(['is_active'=>!$data->is_active], $data);
        $data->refresh();
        return $data;
    }

    public function excel(): SimpleExcelWriter
    {
        set_time_limit(0); // Removes the time limit

        $page = 1;
        $perPage = 1000; // Number of items per page
        $writer = SimpleExcelWriter::streamDownload('classes.xlsx');

        do {
            // Set the current page for pagination
            Paginator::currentPageResolver(function () use ($page) {
                return $page;
            });

            // Retrieve the paginated data
            $paginator = $this->paginate($perPage);
            $items = $paginator->items();

            // Write each item to the Excel file
            foreach ($items as $data) {
                $writer->addRow([
                    'Id' => $data->id,
                    'Name' => $data->name,
                    'Course' => $data->course->name,
                    'Course ID' => $data->course->id,
                    'Graduataion' => $data->course->graduation->name,
                    'Graduataion ID' => $data->course->graduation->id,
                    'Active' => $data->is_active ? 'Yes' : 'No',
                    'Created At' => $data->created_at->format('Y-m-d H:i:s'),
                ]);
            }

            // Move to the next page
            $page++;
            flush();
        } while ($page <= $paginator->lastPage());

        // Close the writer and return the download response
        $writer->close();

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
