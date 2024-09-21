<?php

namespace App\Modules\Admins\RegisteredIndustryStaff\Services;

use App\Modules\IndustryManagement\IndustryAuth\Models\IndustryAuth;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class RegisteredIndustryStaffService
{
    protected function model(string $reg_industry_id, string $created_by): Builder
    {
        return IndustryAuth::with([
            'roles' => function ($query) {
                $query->where('name', Roles::IndustryStaff->value());
            }
        ])
        ->where('reg_industry_id', $reg_industry_id)
        ->where('created_by', $created_by)
        ->whereHas('roles', function ($query) {
            $query->where('name', Roles::IndustryStaff->value());
        })
        ->whereNotNull('created_by');
    }
    protected function query(string $reg_industry_id, string $created_by): QueryBuilder
    {
        return QueryBuilder::for($this->model($reg_industry_id, $created_by))
                ->defaultSort('-id')
                ->allowedSorts('id')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ]);
    }

    public function all(string $reg_industry_id, string $created_by): Collection
    {
        return $this->query($reg_industry_id, $created_by)
                ->lazy(100)->collect();
    }

    public function paginate(string $reg_industry_id, string $created_by, Int $total = 10): LengthAwarePaginator
    {
        return $this->query($reg_industry_id, $created_by)
                ->paginate($total)
                ->appends(request()->query());
    }

    public function get(string $reg_industry_id, string $created_by, string $id): IndustryAuth
    {
        return $this->query($reg_industry_id, $created_by)->where('id', $id)->firstOrFail();
    }

    public function toggleStatus(IndustryAuth $industry): IndustryAuth
    {
        $industry->update(['is_blocked'=>!$industry->is_blocked]);
        $industry->refresh();
        return $industry;
    }

    public function excel(string $reg_industry_id, string $created_by) : SimpleExcelWriter
    {
        $model = $this->model($reg_industry_id, $created_by);
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('industry_staffs.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Name' => $data->name,
                'Email' => $data->email,
                'Phone' => $data->phone,
                'Role' => $data->currentRole,
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

