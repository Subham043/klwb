<?php

namespace App\Modules\ApplicationManagement\ApplicationDates\Services;

use App\Modules\ApplicationManagement\ApplicationDates\Models\ApplicationDate;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class ApplicationDateService
{

    protected function model(): Builder
    {
        return ApplicationDate::whenNotAdmin();
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'application_year')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
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

    public function getById(Int $id): ApplicationDate|null
    {
        return $this->model()->findOrFail($id);
    }
    
    public function getLatest(): ApplicationDate|null
    {
        return $this->model()->latest()->firstOrFail();
    }
    
    public function areScholarshipApplicationOpen(): bool
    {
        $applicationDate = $this->getLatest();
        if ($applicationDate==null || (!(now()->between($applicationDate->from_date->format('Y-m-d'), $applicationDate->to_date->addDay(1)->format('Y-m-d'))))) {
            return false;
        }
        return true;
    }

    public function create(array $data): ApplicationDate
    {
        return ApplicationDate::create($data);
    }

    public function update(array $data, ApplicationDate $applicationDate): ApplicationDate
    {
        $applicationDate->update($data);
        return $applicationDate;
    }

    public function delete(ApplicationDate $applicationDate): bool|null
    {
        return $applicationDate->delete();
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
