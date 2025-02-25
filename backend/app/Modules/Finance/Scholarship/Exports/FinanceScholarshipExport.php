<?php

namespace App\Modules\Finance\Scholarship\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class FinanceScholarshipExport implements FromQuery, WithHeadings, WithMapping
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
			(string) $data->account->ifsc,
			(string) $data->mark->graduation->scholarship_fee->amount.' ' ?? '0.00',
			'0.00',
			'30428018817',
			'WELFARECOME',
			'BLORE',
			(string) $data->account->acc_no.' ',
			$data->account->holder,
			$data->account->branch,
			'SCHOL',
			'NEFT',
			'welfarecommissioner123@gmail.com',
			$data->basic_detail->gender,
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'IFSC CODE',
			'Transaction Amount',
			'Commission Amount',
			'Remitter\'s Account Number',
			'Remitter\'s Name',
			'Remitter\'s Address',
			'Beneficiary A/C No.',
			'Beneficiary Name',
			'Beneficiary Address',
			'Payment Details',
			'Sender to Receiver Information',
			'Email ID',
			'Gender',
		];
	}
}
