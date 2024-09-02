<?php

namespace App\Modules\IndustryManagement\Industry\Services;

use App\Http\Abstracts\AbstractAuthenticableService;
use App\Http\Services\FileService;
use App\Modules\IndustryManagement\Industry\Models\IndustryAuth;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;

class IndustryAuthService extends AbstractAuthenticableService
{

    public function model(): Builder
    {
        return IndustryAuth::with('roles');
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

    public function saveRegDoc(IndustryAuth $industry): IndustryAuth
    {
        $reg_doc = (new FileService)->save_file('reg_doc', (new IndustryAuth)->reg_doc_path);
        return $this->update([
            'reg_doc' => $reg_doc,
        ], $industry);
    }

    public function saveSign(IndustryAuth $industry): IndustryAuth
    {
        $sign = (new FileService)->save_file('sign', (new IndustryAuth)->sign_path);
        return $this->update([
            'sign' => $sign,
        ], $industry);
    }

    public function saveSeal(IndustryAuth $industry): IndustryAuth
    {
        $seal = (new FileService)->save_file('seal', (new IndustryAuth)->seal_path);
        return $this->update([
            'seal' => $seal,
        ], $industry);
    }

    public function savePan(IndustryAuth $industry): IndustryAuth
    {
        $pan = (new FileService)->save_file('pan', (new IndustryAuth)->pan_path);
        return $this->update([
            'pan' => $pan,
        ], $industry);
    }

    public function saveGst(IndustryAuth $industry): IndustryAuth
    {
        $gst = (new FileService)->save_file('gst', (new IndustryAuth)->gst_path);
        return $this->update([
            'gst' => $gst,
        ], $industry);
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
