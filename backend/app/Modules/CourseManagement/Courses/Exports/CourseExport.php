<?php

namespace App\Modules\CourseManagement\Courses\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CourseExport implements FromCollection,WithHeadings,WithMapping
{
    protected $courses;

    public function __construct(Collection $courses)
    {
        $this->courses = $courses;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings():array{
        return[
            'id',
            'Name',
            'Graduataion',
            'Graduataion ID',
            'Active',
            'Created At',
        ];
    }
    public function map($data): array
    {
         return[
            $data->id,
            $data->name,
            $data->graduation->name,
            $data->graduation->id,
            $data->is_active ? 'Yes' : 'No',
            $data->created_at->format('Y-m-d H:i:s'),
         ];
    }
    public function collection()
    {
        return $this->courses;
    }
}
