<?php

namespace App\Modules\InstituteManagement\Staff\Services;

use App\Http\Abstracts\AbstractAuthenticableExcelService;
use App\Http\Enums\Guards;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use App\Modules\Roles\Enums\Roles;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\SimpleExcel\SimpleExcelWriter;

class InstituteEmployeeService extends AbstractAuthenticableExcelService
{

    public function model(): Builder
    {
        return InstituteAuth::with('roles')->whereHas('roles', function ($query) {
            $query->where('name', Roles::InstituteStaff->value());
        })
        ->where('created_by', auth()->guard(Guards::Institute->value())->user()->id)
        ->where('school_id', auth()->guard(Guards::Institute->value())->user()->school_id);
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

    public function toggleStatus(InstituteAuth $institute): InstituteAuth
    {
        $institute->update(['is_blocked'=>!$institute->is_blocked]);
        $institute->refresh();
        return $institute;
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->query();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('staffs.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Name' => $data->name,
                'Email' => $data->email,
                'Phone' => $data->phone,
                'Role' => $data->current_role,
                'Blocked' => $data->is_blocked ? 'Yes' : 'No',
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
            ->orWhere('email', 'LIKE', '%' . $value . '%')
            ->orWhere('phone', 'LIKE', '%' . $value . '%');
        });
    }
}
