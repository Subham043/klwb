<?php

namespace App\Modules\Admins\Reports\Contributions\Services;

use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class ContributionService
{

	protected function model(): Builder
	{
		return Payment::with([
			'industry' => function ($query) {
				$query->with(['city', 'taluq']);
			}
		])->whereHas('industry', function ($query) {
			$query->whereHas('city')->whereHas('taluq');
		})->where('status', PaymentStatus::Success->value);
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-id')
			->allowedSorts('id', 'year')
			->allowedFilters([
				'year',
				AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
					$query->whereHas('industry', function ($qry) use ($value) {
						$qry->where('taluq_id', $value);
					});
				}),
				AllowedFilter::callback('has_city', function (Builder $query, $value) {
					$query->whereHas('industry', function ($qry) use ($value) {
						$qry->where('city_id', $value);
					});
				}),
				AllowedFilter::callback('from_date', function (Builder $query, $value) {
					$query->where('payed_on', '>=', $value);
				}),
				AllowedFilter::callback('to_date', function (Builder $query, $value) {
					$query->where('payed_on', '<=', $value);
				}),
			]);
	}

	public function getCount()
	{
		return $this->query()->count();
	}

	public function getTotalAmount()
	{
		return $this->query()->sum('price');
	}

	public function excel(): SimpleExcelWriter
	{
		$model = $this->query();
		$i = 0;
		$writer = SimpleExcelWriter::streamDownload('contributions.xlsx');
		foreach ($model->lazy(1000)->collect() as $data) {
			$writer->addRow([
				'Id' => $data->id,
				'Industry' => $data->industry->name ?? '',
				'District' => $data->industry->city->name ?? '',
				'Taluq' => $data->industry->taluq->name ?? '',
				'Year' => $data->year,
				'Pay ID' => $data->pay_id,
				'Price' => $data->price,
				'Male Count' => $data->male,
				'Female Count' => $data->female,
				'Total Count' => $data->female + $data->male,
				'Interest' => $data->interest,
				'Status' => PaymentStatus::getValue($data->status),
				'Payed On' => $data->payed_on->format('Y-m-d'),
			]);
			if ($i == 1000) {
				flush();
			}
			$i++;
		}
		return $writer;
	}
}
