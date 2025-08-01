<?php

namespace App\Modules\Admins\Institutes\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\Admins\Institutes\Models\Institute;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class InstituteService extends AbstractExcelService
{
    public function model(): Builder
    {
        return Institute::with([
            'taluq' => function ($query) {
                $query->with([
                    'city' => function ($qry) {
                        $qry->with('state');
                    }
                ]);
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
                            $query->whereHas('taluq', function ($qry) use ($value) {
                                $qry->where('city_id', $value);
                            });
                        });
                    }),
                    AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
                        $query->where(function ($query) use ($value) {
                            $query->where('taluq_id', $value);
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

    public function toggleStatus(Institute $data): Institute
    {
        $status = true;
        if($data->is_active){
            $status = false;
        }
        $this->update(['is_active'=>$status], $data);
        $data->auth->profile->update(['is_blocked' => !$status]);
        $data->refresh();
        return $data;
    }

    //error in excel

    public function excel(): SimpleExcelWriter
    {
        set_time_limit(0); // Removes the time limit

        $page = 1;
        $perPage = 1000; // Number of items per page
        $writer = SimpleExcelWriter::streamDownload('institutes.xlsx');

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
                    // 'Reg No.' => $data->reg_no ?? '',
                    'Name' => $data->name ?? '',
                    'Management Type' => $data->management_type ?? '',
                    'Category' => $data->category ?? '',
                    'Type' => $data->type ?? '',
                    'Urban/Rural' => $data->urban_rural ?? '',
                    'Taluq' => $data->taluq->name ?? '',
                    'Taluq ID' => $data->taluq->id ?? '',
                    'District' => $data->taluq->city->name ?? '',
                    'District ID' => $data->taluq->city->id ?? '',
                    'Active' => $data->is_active ? 'Yes' : 'No',
                    'Created At' => $data->created_at->format('Y-m-d H:i:s') ?? '',
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
            $q->where(function ($q) use ($value) {
                $valueAmp = str_replace('&', '&amp;', $value);
                $q->where('name', 'LIKE', '%' . $value . '%')
                    ->orWhere('name', 'LIKE', '%' . $valueAmp . '%');
            })
            ->orWhere('management_type', 'LIKE', '%' . $value . '%')
            ->orWhere('category', 'LIKE', '%' . $value . '%')
            ->orWhere('type', 'LIKE', '%' . $value . '%')
            ->orWhere('urban_rural', 'LIKE', '%' . $value . '%')
            ->orWhere('reg_no', 'LIKE', '%' . $value . '%')
            ->orWhereHas('taluq', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%')
                ->orWhereHas('city', function($qry) use($value){
                    $qry->where('name', 'LIKE', '%' . $value . '%');
                });
            });
        });
    }
}
