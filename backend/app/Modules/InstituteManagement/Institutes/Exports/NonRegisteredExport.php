<?php

namespace App\Modules\InstituteManagement\Institutes\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class NonRegisteredExport implements FromCollection,WithHeadings,WithMapping
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
            $data->urban_rural->value ?? '',
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
