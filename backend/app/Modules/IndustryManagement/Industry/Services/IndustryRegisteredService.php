<?php

namespace App\Modules\IndustryManagement\Industry\Services;

use App\Modules\IndustryManagement\Industry\Models\IndustryAuth;
use App\Modules\IndustryManagement\Industry\Requests\RegisteredUpdateRequest;
use App\Modules\IndustryManagement\RequestIndustry\Enums\Act;
use App\Modules\LocationManagement\Cities\Services\CityService;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class IndustryRegisteredService
{
    protected function model(): Builder
    {
        return IndustryAuth::with([
            'registered_industry',
            'taluq',
            'city',
        ])
        ->whereHas('registered_industry')
        ->whereNull('created_by');
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'principal')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('has_state', function (Builder $query, $value) {
                        $query->whereHas('city', function ($qry) use ($value) {
                            $qry->where('state_id', $value);
                        });
                    }),
                    AllowedFilter::callback('has_city', function (Builder $query, $value) {
                        $query->where('city_id', $value);
                    }),
                    AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
                        $query->where('taluq_id', $value);
                    })
                ]);
    }

    public function all(): Collection
    {
        return $this->query()
                ->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        return $this->query()
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): IndustryAuth|null
    {
        return $this->model()->findOrFail($id);
    }

    public function update(RegisteredUpdateRequest $request, IndustryAuth $industry): IndustryAuth
    {
        $industry->update([
            'address' => $request->address,
            'taluq_id' => $request->taluq_id,
            'city_id' => $request->city_id,
            'is_blocked' => !$request->is_active,
        ]);
        $city = (new CityService)->getById($request->city_id);
        $industry->registered_industry->update([
            'name' => $request->name,
            'act' => $request->act,
            'state_id' => $city->state->id,
            'taluq_id' => $request->taluq_id,
            'city_id' => $request->city_id,
            'is_active' => $request->is_active,
        ]);
        $industry->refresh();
        return $industry;
    }

    public function updateAuth(array $data, IndustryAuth $industry): IndustryAuth
    {
        $industry->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'is_blocked' => $data['is_blocked'],
        ]);
        $industry->registered_industry->update([
            'is_active' => !$data['is_blocked'],
        ]);
        $industry->refresh();
        return $industry;
    }

    public function toggleStatus(IndustryAuth $industry): IndustryAuth
    {
        $status = true;
        if($industry->is_blocked){
            $status = false;
        }
        $industry->update(['is_blocked'=>$status]);
        $industry->registered_industry->update([
            'is_active' => !$status,
        ]);
        $industry->refresh();
        return $industry;
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->model();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('registered_industry.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Name' => $data->registered_industry->name,
                'Director Name' => $data->name,
                'Mobile' => $data->phone,
                'Email' => $data->email,
                'Act' => Act::getValue($data->registered_industry->act),
                'Taluq' => $data->taluq->name,
                'Taluq ID' => $data->taluq->id,
                'District' => $data->city->name,
                'District ID' => $data->city->id,
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
            $q->where('principal', 'LIKE', '%' . $value . '%');
        });
    }
}
