<?php

namespace App\Modules\ApplicationManagement\ApplicationDates\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class ApplicationDateExport implements FromCollection,WithHeadings,WithMapping
{
    protected $applicationDates;

    public function __construct(Collection $applicationDates)
    {
        $this->applicationDates = $applicationDates;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings():array{
        return[
            'id',
            'From Date',
            'To Date',
            'Approval End Date',
            'Verification End Date',
            'Application Year',
            'Active',
            'Created At',
        ];
    }
    public function map($data): array
    {
         return[
            $data->id,
            $data->from_date->format('Y-m-d'),
            $data->to_date->format('Y-m-d'),
            $data->approval_end_date->format('Y-m-d'),
            $data->verification_end_date->format('Y-m-d'),
            $data->application_year,
            $data->is_active ? 'Yes' : 'No',
            $data->created_at->format('Y-m-d H:i:s'),
         ];
    }
    public function collection()
    {
        return $this->applicationDates;
    }
}
