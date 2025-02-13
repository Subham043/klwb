<?php

namespace App\Modules\Admins\ApplicationDates\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\Admins\ApplicationDates\Models\ApplicationDate;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class ApplicationDateService extends AbstractExcelService
{

    public function model(): Builder
    {
        return ApplicationDate::isActive();
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
            ->defaultSort('-id')
            ->allowedSorts('id', 'application_year')
            ->allowedFilters([
                AllowedFilter::custom('search', new CommonFilter, null, false),
            ]);
    }

    public function getExcelQuery(): QueryBuilder
	{
		return $this->query();
	}

    public function getLatest(): ApplicationDate
    {
        return $this->model()->latest('id')->firstOrFail();
    }

    public function toggleStatus(ApplicationDate $data): ApplicationDate
    {
        $this->update(['is_active' => !$data->is_active], $data);
        $data->refresh();
        return $data;
    }

    public function excel(): SimpleExcelWriter
    {
        set_time_limit(0); // Removes the time limit

        $page = 1;
        $perPage = 1000; // Number of items per page
        $writer = SimpleExcelWriter::streamDownload('application_dates.xlsx');

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
                    'From Date' => $data->from_date->format('Y-m-d'),
                    'To Date' => $data->to_date->format('Y-m-d'),
                    'Application Year' => $data->application_year,
                    'Can Student Resubmit' => $data->can_resubmit ? 'Yes' : 'No',
                    'Can Industry/Institute Approve' => $data->can_approve ? 'Yes' : 'No',
                    'Can Officials Verify' => $data->can_verify ? 'Yes' : 'No',
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
        $query->where(function ($q) use ($value) {
            $q->where('application_year', 'LIKE', '%' . $value . '%')
                ->orWhere('from_date', 'LIKE', '%' . $value . '%')
                ->orWhere('to_date', 'LIKE', '%' . $value . '%')
                ->orWhere('id', 'LIKE', '%' . $value . '%');
        });
    }
}
