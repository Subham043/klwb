<?php

namespace App\Modules\Admins\RegisteredIndustry\Exports;

use App\Modules\Admins\RequestIndustry\Enums\Act;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class RegisteredIndustryExport implements FromQuery, WithHeadings, WithMapping
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
			$data->industry->name,
			$data->name,
			(string) $data->phone.' ',
			$data->email,
			Act::getValue($data->industry->act) ?? '',
			$data->industry->category ?? '',
			$data->taluq->name,
			(string) $data->taluq->id.' ',
			$data->city->name,
			(string) $data->city->id.' ',
			$data->created_at->format('Y-m-d H:i:s'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Name',
			'Director Name',
			'Mobile',
			'Email',
			'Act',
			'Category',
			'Taluq',
			'Taluq ID',
			'District',
			'District ID',
			'Created At',
		];
	}
}
