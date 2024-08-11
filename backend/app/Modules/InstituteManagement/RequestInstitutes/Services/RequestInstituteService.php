<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Services;

use App\Http\Services\FileService;
use App\Modules\InstituteManagement\RequestInstitutes\Models\RequestInstitute;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class RequestInstituteService
{
    protected function model(): Builder
    {
        return RequestInstitute::with([
            'taluq' => function ($query) {
                $query->with([
                    'city' => function ($qry) {
                        $qry->with('state');
                    }
                ]);
            }
        ])->where('is_active', true);
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
                        $query->where('taluq_id', $value);
                    })
                ]);
    }

    public function all(): Collection
    {
        return $this->query()->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        return $this->query()
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): RequestInstitute|null
    {
        return $this->model()->findOrFail($id);
    }

    public function create(array $data): RequestInstitute
    {
        return RequestInstitute::create($data);
    }

    public function saveRegisterDoc(RequestInstitute $requestInstitute): RequestInstitute
    {
        $register_doc = (new FileService)->save_file('register_doc', (new RequestInstitute)->register_doc_path);
        return $this->update([
            'register_doc' => $register_doc,
        ], $requestInstitute);
    }

    public function update(array $data, RequestInstitute $requestInstitute): RequestInstitute
    {
        $requestInstitute->update($data);
        return $requestInstitute;
    }

    public function delete(RequestInstitute $requestInstitute): bool|null
    {
        return $requestInstitute->delete();
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->model();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('request_institutes.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Name' => $data->name,
                'Email' => $data->email,
                'Phone' => $data->mobile,
                'Pincode' => $data->pincode,
                'Address' => $data->address,
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
            $q->where('name', 'LIKE', '%' . $value . '%');
        });
    }
}
