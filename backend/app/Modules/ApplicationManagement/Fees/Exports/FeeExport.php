<?php

namespace App\Modules\ApplicationManagement\Fees\Exports;

use App\Modules\ApplicationManagement\Fees\Models\Fee;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class FeeExport implements FromCollection,WithHeadings,WithMapping
{

    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings():array{
        return[
            'id',
            'Amount',
            'Year',
            'Class',
            'Class ID',
            'Active',
            'Created At',
        ];
    }
    public function map($data): array
    {
         return[
            $data->id,
            $data->amount,
            $data->year,
            $data->classes->name,
            $data->classes->id,
            $data->is_active ? 'Yes' : 'No',
            $data->created_at->format('Y-m-d H:i:s'),
         ];
    }
    public function collection()
    {
        return Fee::with(['classes'])->checkAuth()->get();
    }
}
