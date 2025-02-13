<?php

namespace App\Modules\Admins\Fees\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\Admins\Fees\Models\Fee;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class FeeService extends AbstractExcelService
{
    public function model(): Builder
    {
        return Fee::with('graduation')->isActive();
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'year')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('active_status', function (Builder $query, $value) {
                        if(!empty($value) && request()->user() && request()->user()->hasRole('Super-Admin|Admin')){
                            if(strtolower($value)=="active"){
                                $query->where('is_active', true);
                            }else{
                                $query->where('is_active', false);
                            }
                        }
                    }),
                    AllowedFilter::callback('year', function (Builder $query, $value) {
                        if(!empty($value)){
                            $query->where('year', $value);
                        }
                    }),
                    AllowedFilter::callback('has_graduation', function (Builder $query, $value) {
                        if(!empty($value)){
                            $query->where('graduation_id', $value);
                        }
                    }),
                ]);
    }

    public function toggleStatus(Fee $data): Fee
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
        $writer = SimpleExcelWriter::streamDownload('fees.xlsx');

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
                    'Amount' => $data->amount,
                    'Year' => $data->year,
                    'Graduation' => $data->graduation->name,
                    'Graduation ID' => $data->graduation->id,
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
            $q->where('amount', 'LIKE', '%' . $value . '%')
            ->orWhere('year', 'LIKE', '%' . $value . '%')
            ->orWhereHas('graduation', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%');
            });
        });
    }
}
