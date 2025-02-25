<?php

namespace App\Modules\Admins\Reports\Contributions\Exports;

use App\Modules\Admins\RequestIndustry\Enums\Act;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class ContributionComparisonExport implements FromQuery, WithHeadings, WithMapping
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
			$data->registered_industries_id,
			$data->registered_industries_name,
			Act::getValue($data->registered_industries_act) ?? '',
			$data->registered_industries_category ?? '',
			(string) $data->selected_year,
			$data->price_selected_year ? (string) $data->price_selected_year : 'Not Paid',
			$data->pay_id_selected_year ? (string) $data->pay_id_selected_year : 'Not Paid',
			(string) $data->previous_selected_year,
			$data->price_previous_selected_year ? (string) $data->price_previous_selected_year : 'Not Paid',
			$data->pay_id_previous_year ? (string) $data->pay_id_previous_year : 'Not Paid',
			$data->registered_industries_is_active ? 'Yes' : 'No',
		];
	}

	public function headings(): array
	{
		return [
			'Company ID',
			'Company Name',
			'Act',
			'Category',
			'Selected Year',
			'Amount',
			'Pay ID',
			'Previous Year',
			'Amount',
			'Pay ID',
			'Active',
		];
	}
}
