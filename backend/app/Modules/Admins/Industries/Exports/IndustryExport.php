<?php

namespace App\Modules\Admins\Industries\Exports;

use App\Modules\Admins\RequestIndustry\Enums\Act;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class IndustryExport implements FromQuery, WithHeadings, WithMapping
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
			// $data->reg_id,
			$data->name,
			Act::getValue($data->act) ?? '',
			$data->category ?? '',
			(string) $data->pincode,
			$data->is_active ? 'Yes' : 'No',
			$data->created_at->format('Y-m-d H:i:s'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			// 'Reg ID.',
			'Name',
			'Act',
			'Category',
			'Pincode',
			'Active',
			'Created At',
		];
	}
}
