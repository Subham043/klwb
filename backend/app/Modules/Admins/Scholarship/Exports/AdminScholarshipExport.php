<?php

namespace App\Modules\Admins\Scholarship\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class AdminScholarshipExport implements FromQuery, WithHeadings, WithMapping
{

	private QueryBuilder $query;
	public function __construct(QueryBuilder $query)
	{
		$this->query = $query;
	}
	public function query()
	{
		return $this->query; // Using cursor() to avoid memory overload
	}

	public function map($data): array
	{
		return [
			$data->id,
			$data->basic_detail->name,
			$data->basic_detail->father_name,
			$data->basic_detail->mother_name,
			$data->basic_detail->parent_phone,
			$data->basic_detail->gender,
			$data->basic_detail->category,
			$data->basic_detail->cast_no,
			$data->basic_detail->adharcard_no,
			$data->basic_detail->f_adhar,
			$data->basic_detail->m_adhar,
			$data->institute->name,
			$data->industry->name,
			$data->mark->graduation->name,
			$data->mark->course->name,
			$data->mark->class->name,
			$data->mark->prv_class,
			$data->mark->prv_marks,
			$data->mark->graduation->scholarship_fee->amount ?? 0,
			$data->company->who_working_text,
			$data->company->name,
			$data->company->relationship,
			$data->company->msalary,
			$data->company->pincode,
			$data->company->district->name,
			$data->company->taluq->name,
			$data->account->name,
			$data->account->branch,
			$data->account->ifsc,
			$data->account->acc_no,
			$data->account->holder,
			$data->account->account_type,
			$data->application_year,
			$data->date->format('Y-m-d H:i:s'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Name',
			'Father\'s Name',
			'Mohter\'s Name',
			'Phone',
			'Gender',
			'Category',
			'Cast No.',
			'Adhar Card Number',
			'Father\'s Adhar Card Number',
			'Mother\'s Adhar Card Number',
			'Institute',
			'Industry',
			'Graduation',
			'Course',
			'Class',
			'Previous Class',
			'Previous Marks',
			'Scholarship Fee',
			'Whos\'s Working',
			'Parent \ Guardian Name',
			'Relationship',
			'Monthly Salary',
			'Pincode',
			'District',
			'Taluq',
			'Bank Name',
			'Branch Name',
			'IFSC Code',
			'Account Number',
			'Account Holder Name',
			'Account Type',
			'Application Year',
			'Submitted On',
		];
	}
}
