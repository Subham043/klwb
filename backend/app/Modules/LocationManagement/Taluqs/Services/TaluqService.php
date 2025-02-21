<?php

namespace App\Modules\LocationManagement\Taluqs\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\LocationManagement\Taluqs\Models\Taluq;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class TaluqService extends AbstractExcelService
{

    public function model(): Builder
    {
        return Taluq::with([
            'city' => function ($query) {
                $query->with('state');
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
                    AllowedFilter::callback('has_city', function (Builder $query, $value) {
                        $query->where(function ($query) use ($value) {
                            $query->where('city_id', $value);
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

    public function toggleStatus(Taluq $data): Taluq
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
        $writer = SimpleExcelWriter::streamDownload('taluqs.xlsx');

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
                    'Distrct' => $data->city->name,
                    'Distrct ID' => $data->city->id,
                    'State' => $data->city->state->name,
                    'State ID' => $data->city->state->id,
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
            ->orWhereHas('city', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%')
                ->orWhereHas('state', function($q) use($value){
                    $q->where('name', 'LIKE', '%' . $value . '%');
                });
            });
        });
    }
}
