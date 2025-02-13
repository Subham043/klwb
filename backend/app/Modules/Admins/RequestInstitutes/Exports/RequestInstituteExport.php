<?php

namespace App\Modules\Admins\RequestInstitutes\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class RequestInstituteExport implements FromQuery, WithHeadings, WithMapping
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
			$data->email,
			$data->mobile,
			$data->pincode,
			$data->address,
			$data->taluq->name,
			$data->taluq->id,
			$data->taluq->city->name,
			$data->taluq->city->id,
			$data->is_active ? 'Yes' : 'No',
			$data->created_at->format('Y-m-d H:i:s'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Name',
			'Email',
			'Phone',
			'Pincode',
			'Address',
			'Taluq',
			'Taluq ID',
			'District',
			'District ID',
			'Active',
			'Created At',
		];
	}
}
