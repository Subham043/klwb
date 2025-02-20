<?php

namespace App\Modules\Admins\RequestIndustry\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class RequestIndustryExport implements FromQuery, WithHeadings, WithMapping
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
			$data->company,
			$data->email,
			(string) $data->mobile,
			// $data->gst_no,
			// $data->pan_no,
			// $data->act,
			// $data->category,
			$data->address,
			$data->taluq->name,
			(string) $data->taluq->id,
			$data->city->name,
			(string) $data->city->id,
			$data->reject_reason ?? '',
			$data->created_at->format('Y-m-d H:i:s'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Company',
			'Email',
			'Phone',
			// 'GST',
			// 'PAN',
			// 'Act',
			// 'Category',
			'Address',
			'Taluq',
			'Taluq ID',
			'District',
			'District ID',
			'Reason',
			'Created At',
		];
	}
}
