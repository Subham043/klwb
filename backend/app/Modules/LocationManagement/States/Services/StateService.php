<?php

namespace App\Modules\LocationManagement\States\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\LocationManagement\States\Models\State;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class StateService extends AbstractExcelService
{
    public function model(): Builder
    {
        return State::isActive();
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ]);
    }

    public function toggleStatus(State $data): State
    {
        $this->update(['is_active'=>!$data->is_active], $data);
        $data->refresh();
        return $data;
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->query();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('states.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Name' => $data->name,
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
            $q->where('name', 'LIKE', '%' . $value . '%');
        });
    }
}
