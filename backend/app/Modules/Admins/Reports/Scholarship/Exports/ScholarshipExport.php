<?php

namespace App\Modules\Admins\Reports\Scholarship\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class ScholarshipExport implements FromQuery, WithHeadings, WithMapping
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
			$data->year,
			$data->sc_count,
			$data->st_count,
			$data->obc_count,
			$data->general_count,
			$data->male_count,
			$data->female_count,
			$data->pending_count,
			$data->rejected_count,
			$data->approved_count,
			$data->total_count,
		];
	}

	public function headings(): array
	{
		return [
			'Application Year',
			'SC Count',
			'ST Count',
			'OBC Count',
			'General Count',
			'Male Count',
			'Female Count',
			'Pending Application Count',
			'Rejected Application Count',
			'Approved Application Count',
			'Total Application Count',
		];
	}
}
