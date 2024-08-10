<?php

namespace App\Modules\InstituteManagement\Institutes\Services;

use App\Modules\InstituteManagement\Institutes\Models\Institute;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class InstituteRegisteredService
{
    protected function model(): Builder
    {
        return Institute::with([
            'registered_institute',
            'profile' => function ($query) {
                $query->with(['roles']);
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
