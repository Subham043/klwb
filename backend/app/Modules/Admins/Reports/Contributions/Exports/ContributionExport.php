<?php

namespace App\Modules\Admins\Reports\Contributions\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class ContributionExport implements FromQuery, WithHeadings, WithMapping
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
			(string) $data->year.' ',
			(string) $data->male_count.' ',
			(string) $data->female_count.' ',
			(string) $data->total_countributions.' ',
			(string) $data->total_countribution_amount.' ',
		];
	}

	public function headings(): array
	{
		return [
			'Year',
			'Male Count',
			'Female Count',
			'Total Contribution Count',
			'Total Contribution Amount',
		];
	}
}
