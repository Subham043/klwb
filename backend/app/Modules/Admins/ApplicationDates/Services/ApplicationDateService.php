<?php

namespace App\Modules\Admins\ApplicationDates\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\Admins\ApplicationDates\Models\ApplicationDate;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class ApplicationDateService extends AbstractExcelService
{

    public function model(): Builder
    {
        return ApplicationDate::whenNotAdmin();
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
    
    public function getLatest(): ApplicationDate|null
    {
        return $this->model()->latest()->firstOrFail();
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->model();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('application_dates.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
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
            $q->where('application_year', 'LIKE', '%' . $value . '%');
        });
    }
}
