<?php

namespace App\Modules\States\Exports;

use App\Modules\States\Models\State;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class StateExport implements FromCollection,WithHeadings,WithMapping
{

    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings():array{
        return[
            'id',
            'Name',
            'Active',
            'Created At',
        ];
    }
    public function map($data): array
    {
         return[
            $data->id,
            $data->name,
            $data->is_active ? 'Yes' : 'No',
            $data->created_at->format('Y-m-d H:i:s'),
         ];
    }
    public function collection()
    {
        return State::all();
    }
}