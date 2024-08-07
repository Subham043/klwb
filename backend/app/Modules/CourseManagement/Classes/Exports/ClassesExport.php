<?php

namespace App\Modules\CourseManagement\Classes\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ClassesExport implements FromCollection,WithHeadings,WithMapping
{
    protected $classes;

    public function __construct(Collection $classes)
    {
        $this->classes = $classes;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings():array{
        return[
            'id',
            'Name',
            'Course',
            'Course ID',
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
            $data->course->name,
            $data->course->id,
            $data->course->graduation->name,
            $data->course->graduation->id,
            $data->is_active ? 'Yes' : 'No',
            $data->created_at->format('Y-m-d H:i:s'),
         ];
    }
    public function collection()
    {
        return $this->classes;
    }
}
