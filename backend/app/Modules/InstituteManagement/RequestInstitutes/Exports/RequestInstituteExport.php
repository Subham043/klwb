<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Exports;

use App\Modules\InstituteManagement\RequestInstitutes\Models\RequestInstitute;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class RequestInstituteExport implements FromCollection,WithHeadings,WithMapping
{

    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings():array{
        return[
            'Id',
            'Name',
            'Email',
            'Phone',
            'Pincode',
            'Address',
            'Taluq',
            'Taluq ID',
            'District',
            'District ID',
            'Active',
            'Created At',
        ];
    }
    public function map($data): array
    {
         return[
            $data->id,
            $data->name,
            $data->email,
            $data->mobile,
            $data->pincode,
            $data->address,
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
        return RequestInstitute::with([
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
