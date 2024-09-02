<?php

namespace App\Modules\InstituteManagement\Institutes\Services;

use App\Http\Abstracts\AbstractAuthenticableService;
use App\Http\Services\FileService;
use App\Modules\InstituteManagement\Institutes\Models\Institute;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAddress;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
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

    public function createInstitute(array $data): Institute
    {
        $institute = Institute::create([...$data]);
        return $institute;
    }

    public function createInstituteAddress(array $data): InstituteAddress
    {
        $instituteAddress = InstituteAddress::create([...$data]);
        return $instituteAddress;
    }

    public function saveRegCertification(Institute $institute): Institute
    {
        $reg_certification = (new FileService)->save_file('reg_certification', (new Institute)->reg_certification_path);
        return $this->updateInstitute([
            'reg_certification' => $reg_certification,
        ], $institute);
    }

    public function savePrincipalSignature(Institute $institute): Institute
    {
        $principal_signature = (new FileService)->save_file('principal_signature', (new Institute)->principal_signature_path);
        return $this->updateInstitute([
            'principal_signature' => $principal_signature,
        ], $institute);
    }

    public function saveSeal(Institute $institute): Institute
    {
        $seal = (new FileService)->save_file('seal', (new Institute)->seal_path);
        return $this->updateInstitute([
            'seal' => $seal,
        ], $institute);
    }

    public function updateInstitute(array $data, Institute $institute): Institute
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
