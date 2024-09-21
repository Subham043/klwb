<?php

namespace App\Modules\Admins\RegisteredInstituteStaff\Services;

use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class RegisteredInstituteStaffService
{
    protected function model(string $school_id, string $created_by): Builder
    {
        return InstituteAuth::with([
            'roles' => function ($query) {
                $query->where('name', Roles::InstituteStaff->value());
            }
        ])
        ->where('school_id', $school_id)
        ->where('created_by', $created_by)
        ->whereHas('roles', function ($query) {
            $query->where('name', Roles::InstituteStaff->value());
        })
        ->whereNotNull('created_by');
    }
    protected function query(string $school_id, string $created_by): QueryBuilder
    {
        return QueryBuilder::for($this->model($school_id, $created_by))
                ->defaultSort('-id')
                ->allowedSorts('id')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ]);
    }

    public function all(string $school_id, string $created_by): Collection
    {
        return $this->query($school_id, $created_by)
                ->lazy(100)->collect();
    }

    public function paginate(string $school_id, string $created_by, Int $total = 10): LengthAwarePaginator
    {
        return $this->query($school_id, $created_by)
                ->paginate($total)
                ->appends(request()->query());
    }

    public function get(string $school_id, string $created_by, string $id): InstituteAuth
    {
        return $this->query($school_id, $created_by)->where('id', $id)->firstOrFail();
    }

    public function toggleStatus(InstituteAuth $institute): InstituteAuth
    {
        $institute->update(['is_blocked'=>!$institute->is_blocked]);
        $institute->refresh();
        return $institute;
    }

    public function excel(string $school_id, string $created_by) : SimpleExcelWriter
    {
        $model = $this->model($school_id, $created_by);
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('institute_staffs.xlsx');
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