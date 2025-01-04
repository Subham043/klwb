<?php

namespace App\Modules\Admins\Industries\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\Admins\Industries\Models\Industry;
use App\Modules\Admins\RequestIndustry\Enums\Act;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class IndustryService extends AbstractExcelService
{
    public function model(): Builder
    {
        return Industry::isActive();
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
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

    public function toggleStatus(Industry $data): Industry
    {
        $status = true;
        if($data->is_active){
            $status = false;
        }
        $this->update(['is_active'=>$status], $data);
        $data->auth->update(['is_blocked' => !$status]);
        $data->refresh();
        return $data;
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->query();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('industries.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Reg ID.' => $data->reg_id,
                'Name' => $data->name,
                'Act' => Act::getValue($data->act) ?? '',
                'Category' => $data->category ?? '',
                'Pincode' => $data->pincode,
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
            ->orWhere('act', 'LIKE', '%' . $value . '%')
            ->orWhere('category', 'LIKE', '%' . $value . '%')
            ->orWhere('pincode', 'LIKE', '%' . $value . '%')
            ->orWhere('reg_id', 'LIKE', '%' . $value . '%')
            ->orWhereHas('state', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%');
            })
            ->orWhereHas('city', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%');
            })
            ->orWhereHas('taluq', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%');
            });
        });
    }
}
