<?php

namespace App\Modules\IndustryManagement\RequestIndustry\Services;

use App\Http\Services\FileService;
use App\Modules\IndustryManagement\RequestIndustry\Models\RequestIndustry;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class RequestIndustryService
{
    protected function model(): Builder
    {
        return RequestIndustry::with([
            'taluq',
            'city',
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
                    }),
                    AllowedFilter::callback('has_city', function (Builder $query, $value) {
                        $query->where('city_id', $value);
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

    public function getById(Int $id): RequestIndustry|null
    {
        return $this->model()->findOrFail($id);
    }

    public function create(array $data): RequestIndustry
    {
        return RequestIndustry::create($data);
    }

    public function saveRegisterDoc(RequestIndustry $requestIndustry): RequestIndustry
    {
        $register_doc = (new FileService)->save_file('register_doc', (new RequestIndustry)->register_doc_path);
        return $this->update([
            'register_doc' => $register_doc,
        ], $requestIndustry);
    }

    public function update(array $data, RequestIndustry $requestIndustry): RequestIndustry
    {
        $requestIndustry->update($data);
        return $requestIndustry;
    }

    public function delete(RequestIndustry $requestIndustry): bool|null
    {
        return $requestIndustry->delete();
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->model();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('request_industries.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Company' => $data->company,
                'Email' => $data->email,
                'Phone' => $data->mobile,
                'GST' => $data->gst_no,
                'PAN' => $data->pan_no,
                'Act' => $data->act,
                'Address' => $data->address,
                'Taluq' => $data->taluq->name,
                'Taluq ID' => $data->taluq->id,
                'District' => $data->city->name,
                'District ID' => $data->city->id,
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
