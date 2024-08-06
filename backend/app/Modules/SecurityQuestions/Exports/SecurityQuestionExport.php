<?php

namespace App\Modules\SecurityQuestions\Exports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class SecurityQuestionExport implements FromCollection,WithHeadings,WithMapping
{

    protected $securityQuestions;

    public function __construct(Collection $securityQuestions)
    {
        $this->securityQuestions = $securityQuestions;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function headings():array{
        return[
            'id',
            'Question',
            'Active',
            'Created At',
        ];
    }
    public function map($data): array
    {
         return[
            $data->id,
            $data->question,
            $data->is_active ? 'Yes' : 'No',
            $data->created_at->format('Y-m-d H:i:s'),
         ];
    }
    public function collection()
    {
        return $this->securityQuestions;
    }
}
