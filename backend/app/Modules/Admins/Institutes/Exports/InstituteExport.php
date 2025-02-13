<?php

namespace App\Modules\Admins\Institutes\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class InstituteExport implements FromQuery, WithHeadings, WithMapping
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
			$data->reg_no ?? '',
			$data->name ?? '',
			$data->management_type ?? '',
			$data->category ?? '',
			$data->type ?? '',
			$data->urban_rural ?? '',
			$data->taluq->name ?? '',
			$data->taluq->id ?? '',
			$data->taluq->city->name ?? '',
			$data->taluq->city->id ?? '',
			$data->is_active ? 'Yes' : 'No',
			$data->created_at->format('Y-m-d H:i:s') ?? '',
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Reg No.',
			'Name',
			'Management Type',
			'Category',
			'Type',
			'Urban/Rural',
			'Taluq',
			'Taluq ID',
			'District',
			'District ID',
			'Active',
			'Created At',
		];
	}
}
