<?php

namespace App\Modules\Admins\Contributions\Exports;

use App\Modules\Admins\RequestIndustry\Enums\Act;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class ContributionsExport implements FromQuery, WithHeadings, WithMapping
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
			$data->industry->name ?? '',
			Act::getValue($data->industry->act) ?? '',
			$data->industry->category ?? '',
			$data->industry->city->name ?? '',
			$data->industry->taluq->name ?? '',
			$data->year,
			$data->pay_id,
			$data->price,
			$data->male,
			$data->female,
			$data->female + $data->male,
			$data->interest,
			PaymentStatus::getValue($data->status),
			optional($data->payed_on)->format('Y-m-d'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Industry',
			'Act',
			'Category',
			'District',
			'Taluq',
			'Year',
			'Pay ID',
			'Price',
			'Male Count',
			'Female Count',
			'Total Count',
			'Interest',
			'Status',
			'Payed On'
		];
	}
}
