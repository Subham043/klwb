<?php

namespace App\Modules\Admins\Fees\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\Admins\Fees\Models\Fee;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class FeeService extends AbstractExcelService
{
    public function model(): Builder
    {
        return Fee::with('graduation')->whenNotAdmin();
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'year')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('active_status', function (Builder $query, $value) {
                        if(!empty($value)){
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
                    AllowedFilter::callback('graduation_id', function (Builder $query, $value) {
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

    public function excel() : SimpleExcelWriter
    {
        $model = $this->model();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('fees.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Amount' => $data->amount,
                'Year' => $data->year,
                'Graduation' => $data->graduation->name,
                'Graduation ID' => $data->graduation->id,
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
            $q->where('amount', 'LIKE', '%' . $value . '%')
            ->orWhere('year', 'LIKE', '%' . $value . '%')
            ->orWhereHas('graduation', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%');
            });
        });
    }
}
