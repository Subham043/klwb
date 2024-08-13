<?php

namespace App\Modules\IndustryManagement\Industry\Services;

use App\Http\Services\FileService;
use App\Modules\IndustryManagement\Industry\Models\IndustryAuth;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class IndustryAuthService
{

    protected function model(): Builder
    {
        return IndustryAuth::with('roles');
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

    public function getById(Int $id): IndustryAuth|null
    {
        return $this->model()->findOrFail($id);
    }

    public function getByEmail(String $email): IndustryAuth
    {
        return $this->model()->where('email', $email)->firstOrFail();
    }

    public function getByPhone(String $phone): IndustryAuth
    {
        return $this->model()->where('phone', $phone)->firstOrFail();
    }

    public function createIndustryAuth(array $data): IndustryAuth
    {
        $industryAuth = IndustryAuth::create([...$data, 'otp' => rand (1111, 9999)]);
        return $industryAuth;
    }

    public function saveRegisterDoc(IndustryAuth $industry): IndustryAuth
    {
        $register_doc = (new FileService)->save_file('register_doc', (new IndustryAuth)->register_doc_path);
        return $this->updateIndustryAuth([
            'register_doc' => $register_doc,
        ], $industry);
    }

    public function saveSign(IndustryAuth $industry): IndustryAuth
    {
        $sign = (new FileService)->save_file('sign', (new IndustryAuth)->sign_path);
        return $this->updateIndustryAuth([
            'sign' => $sign,
        ], $industry);
    }

    public function saveSeal(IndustryAuth $industry): IndustryAuth
    {
        $seal = (new FileService)->save_file('seal', (new IndustryAuth)->seal_path);
        return $this->updateIndustryAuth([
            'seal' => $seal,
        ], $industry);
    }

    public function savePan(IndustryAuth $industry): IndustryAuth
    {
        $pan = (new FileService)->save_file('pan', (new IndustryAuth)->pan_path);
        return $this->updateIndustryAuth([
            'pan' => $pan,
        ], $industry);
    }

    public function saveGst(IndustryAuth $industry): IndustryAuth
    {
        $gst = (new FileService)->save_file('gst', (new IndustryAuth)->gst_path);
        return $this->updateIndustryAuth([
            'gst' => $gst,
        ], $industry);
    }

    public function updateIndustryAuth(array $data, IndustryAuth $industryAuth): IndustryAuth
    {
        $industryAuth->update($data);
        return $industryAuth;
    }

    public function syncRoles(array $roles = [], IndustryAuth $industryAuth): void
    {
        $industryAuth->syncRoles($roles);
    }

    public function delete(IndustryAuth $industryAuth): bool|null
    {
        return $industryAuth->delete();
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
