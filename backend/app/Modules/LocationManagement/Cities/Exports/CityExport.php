<?php

namespace App\Modules\LocationManagement\Cities\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class CityExport implements FromQuery, WithHeadings, WithMapping
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
			$data->name,
			$data->special_name ?? 'N/A',
			$data->state->name,
   $data->state->id,
			$data->is_active ? 'Yes' : 'No',
			$data->created_at->format('Y-m-d H:i:s'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Name',
			'Special Name',
			'State',
   'State Id',
			'Active',
			'Created At',
		];
	}
}
