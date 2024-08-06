<?php

namespace App\Modules\InstituteManagement\RegisteredInstitutes\Exports;

use App\Modules\InstituteManagement\RegisteredInstitutes\Models\RegisteredInstitute;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class RegisteredInstituteExport implements FromCollection,WithHeadings,WithMapping
{

    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings():array{
        return[
            'Id',
            'Reg No.',
            'Name',
            'Management Type',
            'Category',
            'Type',
            'Urban/Rural',
            'Taluq',
            'Taluq ID',
            'City',
            'City ID',
            'Active',
            'Created At',
        ];
    }
    public function map($data): array
    {
         return[
            $data->id,
            $data->reg_no,
            $data->name,
            $data->management_type,
            $data->category,
            $data->type,
            $data->urban_rural->value,
            $data->taluq->name,
            $data->taluq->id,
            $data->taluq->city->name,
            $data->taluq->city->id,
            $data->is_active ? 'Yes' : 'No',
            $data->created_at->format('Y-m-d H:i:s'),
         ];
    }
    public function collection()
    {
        return RegisteredInstitute::with([
            'taluq' => function ($query) {
                $query->with([
                    'city' => function ($qry) {
                        $qry->with('state');
                    }
                ]);
            }
        ])->checkAuth()->get();
    }
}
