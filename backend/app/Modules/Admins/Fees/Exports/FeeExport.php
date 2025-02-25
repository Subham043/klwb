<?php

namespace App\Modules\Admins\Fees\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class FeeExport implements FromQuery, WithHeadings, WithMapping
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
			(string) $data->amount.' ',
			(string) $data->year.' ',
			$data->graduation->name,
			(string) $data->graduation->id.' ',
			$data->is_active ? 'Yes' : 'No',
			$data->created_at->format('Y-m-d H:i:s'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Amount',
			'Year',
			'Graduation',
			'Graduation ID',
			'Active',
			'Created At',
		];
	}
}
