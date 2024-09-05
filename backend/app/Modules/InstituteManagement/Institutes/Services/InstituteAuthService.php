<?php

namespace App\Modules\InstituteManagement\Institutes\Services;

use App\Http\Abstracts\AbstractAuthenticableService;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAddress;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use App\Modules\InstituteManagement\Institutes\Models\School;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;

class InstituteAuthService extends AbstractAuthenticableService
{

    public function model(): Builder
    {
        return InstituteAuth::with('roles');
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

    public function createInstitute(array $data): School
    {
        $institute = School::create([...$data]);
        return $institute;
    }

    public function createInstituteAddress(array $data): InstituteAddress
    {
        $instituteAddress = InstituteAddress::create([...$data]);
        return $instituteAddress;
    }

    public function updateInstitute(array $data, School $institute): School
    {
        $institute->update($data);
        return $institute;
    }

    public function updateInstituteAddress(array $data, InstituteAddress $instituteAddress): InstituteAddress
    {
        $instituteAddress->update($data);
        return $instituteAddress;
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
