<?php

namespace App\Modules\IndustryManagement\Staff\Services;

use App\Http\Enums\Guards;
use App\Modules\IndustryManagement\Industry\Models\IndustryAuth;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\SimpleExcel\SimpleExcelWriter;

class IndustryEmployeeService{

    protected function model(): Builder
    {
        return IndustryAuth::with('roles')->whereHas('roles', function ($query) {
            $query->where('name', Roles::IndustryStaff->value());
        })
        ->where('created_by', auth()->guard(Guards::Industry->value())->user()->id)
        ->where('reg_industry_id', auth()->guard(Guards::Industry->value())->user()->reg_industry_id);
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
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

    public function getById(Int $id)
    {
        return $this->model()->findOrFail($id);
    }

    public function create(array $data): IndustryAuth
    {
        $employee = IndustryAuth::create([...$data, 'otp' => rand (1111, 9999)]);
        return $employee;
    }

    public function update(array $data, IndustryAuth $employee): IndustryAuth
    {
        $employee->update($data);
        return $employee;
    }

    public function syncRoles(array $roles = [], IndustryAuth $employee): void
    {
        $employee->syncRoles($roles);
    }

    public function delete(IndustryAuth $employee): bool|null
    {
        return $employee->delete();
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->model();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('staffs.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
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
