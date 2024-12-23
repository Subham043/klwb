<?php

namespace App\Modules\Admins\NonRegisteredInstitute\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\Admins\Institutes\Models\Institute;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class NonRegisteredInstituteService extends AbstractExcelService
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
        ])
        ->doesntHave('auth')
        ->isActive();
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'principal')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('has_city', function (Builder $query, $value) {
                        $query->whereHas('taluq', function ($qry) use ($value) {
                            $qry->where('city_id', $value);
                        });
                    }),
                    AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
                        $query->where('taluq_id', $value);
                    }),
                    AllowedFilter::callback('active_status', function (Builder $query, $value) {
                        if(!empty($value) && request()->user() && request()->user()->hasRole('Super-Admin|Admin')){
                            if(strtolower($value)=="active"){
                                $query->where('is_active', true);
                            }else{
                                $query->where('is_active', false);
                            }
                        }
                    }),
                ]);
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->query();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('non_registered_institutes.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Reg No.' => $data->reg_no,
                'Name' => $data->name,
                'Management Type' => $data->management_type,
                'Category' => $data->category,
                'Type' => $data->type,
                'Urban/Rural' => $data->urban_rural,
                'Taluq' => $data->taluq->name,
                'Taluq ID' => $data->taluq->id,
                'District' => $data->taluq->city->name,
                'District ID' => $data->taluq->city->id,
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
