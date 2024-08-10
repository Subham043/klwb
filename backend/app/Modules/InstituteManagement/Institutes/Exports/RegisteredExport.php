<?php

namespace App\Modules\InstituteManagement\Institutes\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class RegisteredExport implements FromCollection,WithHeadings,WithMapping
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
            'Principal Name',
            'Mobile',
            'Email',
            'Management Type',
            'District',
            'Taluq',
            'Created At',
        ];
    }
    public function map($data): array
    {
         return[
            $data->id,
            $data->registered_institute->name,
            $data->principal,
            $data->email,
            $data->phone,
            $data->registered_institute->management_type,
            $data->address->city->name,
            $data->address->taluq->name,
            $data->created_at->format('Y-m-d H:i:s'),
         ];
    }
    public function collection()
    {
        return $this->institutes;
    }
}
