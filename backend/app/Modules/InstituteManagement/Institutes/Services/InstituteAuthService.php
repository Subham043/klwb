<?php

namespace App\Modules\InstituteManagement\Institutes\Services;

use App\Http\Services\FileService;
use App\Modules\InstituteManagement\Institutes\Models\Institute;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAddress;
use App\Modules\InstituteManagement\Institutes\Models\InstituteAuth;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class InstituteAuthService
{

    protected function model(): Builder
    {
        return InstituteAuth::with('roles');
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
        return $this->query()
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): InstituteAuth|null
    {
        return $this->model()->findOrFail($id);
    }

    public function getByEmail(String $email): InstituteAuth
    {
        return $this->model()->where('email', $email)->firstOrFail();
    }

    public function getByPhone(String $phone): InstituteAuth
    {
        return $this->model()->where('phone', $phone)->firstOrFail();
    }

    public function createInstitute(array $data): Institute
    {
        $institute = Institute::create([...$data]);
        return $institute;
    }

    public function createInstituteAuth(array $data): InstituteAuth
    {
        $instituteAuth = InstituteAuth::create([...$data, 'otp' => rand (1111, 9999)]);
        return $instituteAuth;
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

    public function updateInstituteAuth(array $data, InstituteAuth $instituteAuth): InstituteAuth
    {
        $instituteAuth->update($data);
        return $instituteAuth;
    }

    public function updateInstituteAddress(array $data, InstituteAddress $instituteAddress): InstituteAddress
    {
        $instituteAddress->update($data);
        return $instituteAddress;
    }

    public function syncRoles(array $roles = [], InstituteAuth $instituteAuth): void
    {
        $instituteAuth->syncRoles($roles);
    }

    public function delete(InstituteAuth $instituteAuth): bool|null
    {
        return $instituteAuth->delete();
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
