<?php

namespace App\Modules\Admins\RegisteredInstitute\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class RegisteredInstituteExport implements FromQuery, WithHeadings, WithMapping
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
		 $data->institute->name ?? '',
		 $data->principal ?? '',
		 (string) $data->phone.' ' ?? '',
		 $data->email ?? '',
		 $data->institute->management_type ?? '',
		 $data->address->taluq->name ?? '',
		 (string) $data->address->taluq->id.' ' ?? '',
		 $data->address->city->name ?? '',
		 (string) $data->address->city->id.' ' ?? '',
			$data->created_at->format('Y-m-d H:i:s'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Name',
			'Principal Name',
			'Mobile',
			'Email',
			'Management Type',
			'Taluq',
			'Taluq ID',
			'District',
			'District ID',
			'Created At',
		];
	}
}
