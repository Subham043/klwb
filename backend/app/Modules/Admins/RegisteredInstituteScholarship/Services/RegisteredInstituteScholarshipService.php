<?php

namespace App\Modules\Admins\RegisteredInstituteScholarship\Services;

use App\Modules\Students\Scholarship\Models\Application;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class RegisteredInstituteScholarshipService
{
    protected function model(string $reg_institute_id): Builder
    {
        return Application::commonWith()
		->commonRelation()
		->where('school_id', $reg_institute_id);
    }
    protected function query(string $reg_institute_id): QueryBuilder
    {
        return QueryBuilder::for($this->model($reg_institute_id))
                ->defaultSort('-id')
                ->allowedSorts('id')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ]);
    }

    public function all(string $reg_institute_id): Collection
    {
        return $this->query($reg_institute_id)
                ->lazy(100)->collect();
    }

    public function paginate(string $reg_institute_id, Int $total = 10): LengthAwarePaginator
    {
        return $this->query($reg_institute_id)
                ->paginate($total)
                ->appends(request()->query());
    }

    public function excel(string $reg_institute_id) : SimpleExcelWriter
    {
        $model = $this->model($reg_institute_id);
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('institute_scholarships.xlsx');
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
            $q->where('name', 'LIKE', '%' . $value . '%');
        });
    }
}