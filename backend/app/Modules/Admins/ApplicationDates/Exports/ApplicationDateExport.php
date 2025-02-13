<?php

namespace App\Modules\Admins\ApplicationDates\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class ApplicationDateExport implements FromQuery, WithHeadings, WithMapping
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
			$data->from_date->format('Y-m-d'),
			$data->to_date->format('Y-m-d'),
			$data->application_year,
			$data->can_resubmit ? 'Yes' : 'No',
			$data->can_approve ? 'Yes' : 'No',
			$data->can_verify ? 'Yes' : 'No',
			$data->is_active ? 'Yes' : 'No',
			$data->created_at->format('Y-m-d H:i:s'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'From Date',
			'To Date',
			'Application Year',
			'Can Student Resubmit',
			'Can Industry/Institute Approve',
			'Can Officials Verify',
			'Active',
			'Created At',
		];
	}
}
