<?php

namespace App\Modules\IndustryManagement\Payment\Exports;

use App\Modules\Admins\RequestIndustry\Enums\Act;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class PaymentExport implements FromQuery, WithHeadings, WithMapping
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
			$data->year,
			$data->pay_id,
			$data->male,
			$data->female,
			$data->female + $data->male,
			($data->female + $data->male) * 60,
			$data->interest ?? '0',
			$data->price,
			PaymentStatus::getValue($data->status),
			optional($data->payed_on)->format('Y-m-d'),
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Industry',
			'Year',
			'Pay ID',
			'Male Count',
			'Female Count',
			'Total Count',
			'Price',
			'Interest',
			'Total Amount',
			'Status',
			'Payed On'
		];
	}
}
