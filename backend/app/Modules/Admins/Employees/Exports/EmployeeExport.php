<?php

namespace App\Modules\Admins\Employees\Exports;

use App\Modules\Admins\Employees\Models\Employee;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EmployeeExport implements FromCollection,WithHeadings,WithMapping
{

    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings():array{
        return[
            'id',
            'Name',
            'Email',
            'Phone',
            'Role',
            'Blocked',
            'Created At',
        ];
    }
    public function map($data): array
    {
         return[
            $data->id,
            $data->name,
            $data->email,
            $data->phone,
            $data->currentRole,
            $data->is_blocked ? 'No' : 'Yes',
            $data->created_at->format('Y-m-d H:i:s'),
         ];
    }
    public function collection()
    {
        return Employee::with('roles')
        ->whereHas('roles', fn($q) => $q->whereNot('name', 'Super-Admin')
        ->whereNot('name', 'Student')
        ->whereNot('name', 'Institute')
        ->whereNot('name', 'Industry'))
        ->get();
    }
}
