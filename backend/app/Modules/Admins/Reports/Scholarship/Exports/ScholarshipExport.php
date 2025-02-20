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
			(string) $data->year,
			(string) $data->sc_count,
			(string) $data->st_count,
			(string) $data->obc_count,
			(string) $data->general_count,
			(string) $data->male_count,
			(string) $data->female_count,
			(string) $data->pending_count,
			(string) $data->rejected_count,
			(string) $data->approved_count,
			(string) $data->total_count,
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
