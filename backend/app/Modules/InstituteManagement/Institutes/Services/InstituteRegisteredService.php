<?php

namespace App\Modules\InstituteManagement\Institutes\Services;

use App\Modules\InstituteManagement\Institutes\Models\Institute;
use App\Modules\InstituteManagement\Institutes\Requests\RegisteredUpdateRequest;
use App\Modules\LocationManagement\Taluqs\Services\TaluqService;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class InstituteRegisteredService
{
    protected function model(): Builder
    {
        return Institute::with([
            'registered_institute',
            'profile' => function ($query) {
                $query->with(['roles'])->whereNull('created_by');
            },
            'address' => function ($query) {
                $query->with(['state', 'city', 'taluq']);
            }
        ])
        ->whereHas('profile', function ($query) {
            $query->whereNull('created_by');
        })
        ->whereHas('address', function ($query) {
            $query->with(['state', 'city', 'taluq']);
        })
        ->whereHas('registered_institute')
        ->whereHas('profile');
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'principal')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('has_state', function (Builder $query, $value) {
                        $query->whereHas('address', function ($qry) use ($value) {
                            $qry->where('state_id', $value);
                        });
                    }),
                    AllowedFilter::callback('has_city', function (Builder $query, $value) {
                        $query->whereHas('address', function ($qry) use ($value) {
                            $qry->where('city_id', $value);
                        });
                    }),
                    AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
                        $query->whereHas('address', function ($qry) use ($value) {
                            $qry->where('taluq_id', $value);
                        });
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

    public function getById(Int $id): Institute|null
    {
        return $this->model()->findOrFail($id);
    }

    public function update(RegisteredUpdateRequest $request, Institute $institute): Institute
    {
        $institute->update([
            'principal' => $request->principal,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);
        $taluq = (new TaluqService)->getById($request->taluq_id);
        $institute->address->update([
            'taluq_id' => $taluq->id,
            'city_id' => $taluq->city->id,
            'state_id' => $taluq->city->state->id,
            'address' => $request->address,
            'pincode' => $request->pincode,
        ]);
        $institute->registered_institute->update([
            'taluq_id' => $taluq->id,
            'name' => $request->name,
            'management_type' => $request->management_type,
            'category' => $request->category,
            'type' => $request->type,
            'urban_rural' => $request->urban_rural,
            'is_active' => $request->is_active,
        ]);
        $institute->profile->update([
            'is_blocked' => !$request->is_active,
        ]);
        $institute->refresh();
        return $institute;
    }

    public function updateAuth(array $data, Institute $institute): Institute
    {
        $institute->profile->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'is_blocked' => $data['is_blocked'],
        ]);
        $institute->registered_institute->update([
            'is_active' => !$data['is_blocked'],
        ]);
        $institute->refresh();
        return $institute;
    }

    public function toggleStatus(Institute $institute): Institute
    {
        $status = true;
        if($institute->profile->is_blocked){
            $status = false;
        }
        $institute->profile->update(['is_blocked'=>$status]);
        $institute->registered_institute->update([
            'is_active' => !$status,
        ]);
        $institute->refresh();
        return $institute;
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->model();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('registered_institutes.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Name' => $data->registered_institute->name,
                'Principal Name' => $data->principal,
                'Mobile' => $data->phone,
                'Email' => $data->email,
                'Management Type' => $data->registered_institute->management_type,
                'Taluq' => $data->address->taluq->name,
                'Taluq ID' => $data->address->taluq->id,
                'District' => $data->address->city->name,
                'District ID' => $data->address->city->id,
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
