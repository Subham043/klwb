<?php

namespace App\Modules\LocationManagement\Cities\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\LocationManagement\Cities\Models\City;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class CityService extends AbstractExcelService
{
    public function model(): Builder
    {
        return City::with('state')->whenNotAdmin();
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('has_state', function (Builder $query, $value) {
                        $query->where('state_id', $value);
                    })
                ]);
    }

    public function toggleStatus(City $data): City
    {
        $this->update(['is_active'=>!$data->is_active], $data);
        $data->refresh();
        return $data;
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->model();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('cities.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Name' => $data->name,
                'State' => $data->state->name,
                'State Id' => $data->state->id,
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
            ->orWhereHas('state', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%');
            });
        });
    }
}
