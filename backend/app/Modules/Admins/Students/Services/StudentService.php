<?php

namespace App\Modules\Admins\Students\Services;

use App\Http\Abstracts\AbstractAuthenticableExcelService;
use App\Modules\Students\Users\Models\User;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\SimpleExcel\SimpleExcelWriter;

class StudentService extends AbstractAuthenticableExcelService
{

    public function model(): Builder
    {
        return User::with('roles');
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('account_status', function (Builder $query, $value) {
                        if(!empty($value)){
                            if(strtolower($value)=="blocked"){
                                $query->where('is_blocked', true);
                            }else{
                                $query->where('is_blocked', false);
                            }
                        }
                    }),
                    AllowedFilter::callback('verification_status', function (Builder $query, $value) {
                        if(!empty($value)){
                            if(strtolower($value)=="verified"){
                                $query->whereNotNull('verified_at');
                            }else{
                                $query->whereNull('verified_at');
                            }
                        }
                    }),
                    AllowedFilter::callback('year', function (Builder $query, $value) {
                        if(!empty($value)){
                            $query->whereYear('created_at', $value);
                        }
                    }),
                ]);
    }

    public function toggleStatus(User $user): User
    {
        $this->update(['is_blocked'=>!$user->is_blocked], $user);
        $user->refresh();
        return $user;
    }

    public function excel() : SimpleExcelWriter
    {
        $model = $this->query();
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('employees.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Name' => $data->name,
                'Email' => $data->email,
                'Phone' => $data->phone,
                'Role' => $data->currentRole,
                'Blocked' => $data->is_blocked ? 'Yes' : 'No',
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
            $q->where('name', 'LIKE', '%' . $value . '%')
            ->orWhere('email', 'LIKE', '%' . $value . '%')
            ->orWhere('phone', 'LIKE', '%' . $value . '%');
        });
    }
}
