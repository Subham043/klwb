<?php

namespace App\Modules\InstituteManagement\RequestInstitutes\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class RequestInstituteExport implements FromCollection,WithHeadings,WithMapping
{

    protected $institutes;

    public function __construct(Collection $institutes)
    {
        $this->institutes = $institutes;
    }

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
        return $this->institutes;
    }
}
