<?php

namespace App\Modules\Admins\Scholarship\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class AdminScholarshipExport implements FromQuery, WithHeadings, WithMapping
{

	private QueryBuilder $query;
	private int $max_application_state;
	public function __construct(QueryBuilder $query, int $max_application_state = 0)
	{
		$this->query = $query;
		$this->max_application_state = $max_application_state;
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
			(string) $data->basic_detail->adharcard_no ?? '',
			(string) $data->basic_detail->f_adhar ?? '',
			(string) $data->basic_detail->m_adhar ?? '',
			$data->institute->name,
			$data->industry->name,
			$data->mark->graduation->name,
			$data->mark->course->name,
			$data->mark->class->name,
			$data->mark->prv_class,
			$data->mark->prv_marks,
			$data->mark->graduation->scholarship_fee->amount ?? '0',
			$data->company->who_working_text,
			$data->company->name,
			$data->company->relationship,
			(string) $data->company->msalary,
			$data->company->pincode,
			$data->mark->district->name,
			$data->mark->taluq->name,
			$data->account->name,
			$data->account->branch,
			(string) $data->account->ifsc,
			(string) $data->account->acc_no,
			$data->account->holder,
			$data->account->account_type,
			(string) $data->application_year,
			$this->getStatusMessage($data->status, $data->application_state),
			$data->status==2 && $data->reject_reason ? $data->reject_reason : '',
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
			'Status',
			'Reject Reason',
			'Submitted On',
		];
	}

	private function getStatusMessage($status, $application_state) {
		$statusMap = [
			0 => 'PENDING',
			1 => 'APPROVED',
			2 => 'REJECTED',
		];

		$applicationStateMap = [
			0 => 'STUDENT',
			1 => 'INSTITUTE',
			2 => 'INDUSTRY',
			3 => 'LABOUR BOARD',
			4 => 'ADMIN',
		];

		if($this->max_application_state == 0){
			return $statusMap[$status] . ($statusMap[$status] === 'PENDING' ? ' FROM ' : ' BY ') . $applicationStateMap[$application_state];
		}
		if($application_state > $this->max_application_state){
			return 'APPROVED';
		}
		return $statusMap[$status];
	}
}
