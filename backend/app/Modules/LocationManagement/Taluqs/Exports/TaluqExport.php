<?php

namespace App\Modules\LocationManagement\Taluqs\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TaluqExport implements FromCollection,WithHeadings,WithMapping
{
    protected $taluqs;

    public function __construct(Collection $taluqs)
    {
        $this->taluqs = $taluqs;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings():array{
        return[
            'id',
            'Name',
            'City',
            'City ID',
            'State',
            'State ID',
            'Active',
            'Created At',
        ];
    }
    public function map($data): array
    {
         return[
            $data->id,
            $data->name,
            $data->city->name,
            $data->city->id,
            $data->city->state->name,
            $data->city->state->id,
            $data->is_active ? 'Yes' : 'No',
            $data->created_at->format('Y-m-d H:i:s'),
         ];
    }
    public function collection()
    {
        return $this->taluqs;
    }
}
