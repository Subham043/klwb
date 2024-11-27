<?php

namespace App\Modules\IndustryManagement\Payment\Services;

use App\Http\Enums\Guards;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class PaymentService
{

	protected function model(): Builder
	{
		return Payment::with('industry')->whereHas('industry', function ($query) {
			$query->where('id', auth()->guard(Guards::Industry->value())->user()->reg_industry_id);
		})
			->where('comp_regd_id', auth()->guard(Guards::Industry->value())->user()->reg_industry_id);
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-id')
			->allowedSorts('id', 'year')
			->allowedFilters([
				AllowedFilter::custom('search', new CommonFilter, null, false),
			]);
	}

	public function getLatestByYear(): Payment
	{
		return $this->model()->orderBy('year', 'desc')
			->firstOrFail();
	}

	public function getLatest(): Payment
	{
		return $this->model()
			->latest()
			->firstOrFail();
	}

	public function getById(string $id): Payment
	{
		return $this->model()
			->where('id', $id)
			->latest()
			->firstOrFail();
	}

	public function getPaymentCompletedById(string $id): Payment
	{
		return $this->model()
			->where('id', $id)
			->where('status', 1)
			->latest()
			->firstOrFail();
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
	}

	public function getPaidYears()
	{
		return $this->query()->lazy(100)->collect()
			->pluck('year')->toArray();
	}

	public function excel(): SimpleExcelWriter
	{
		$model = $this->model();
		$i = 0;
		$writer = SimpleExcelWriter::streamDownload('payments.xlsx');
		foreach ($model->lazy(1000)->collect() as $data) {
			$writer->addRow([
				'Id' => $data->id,
				'Industry' => $data->industry->name ?? '',
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


class CommonFilter implements Filter
{
	public function __invoke(Builder $query, $value, string $property)
	{
		$query->where(function ($q) use ($value) {
			$q->where('year', 'LIKE', '%' . $value . '%')
				->orWhere('pay_id', 'LIKE', '%' . $value . '%')
				->orWhere('price', 'LIKE', '%' . $value . '%')
				->orWhereHas('industry', function ($q) use ($value) {
					$q->where('name', 'LIKE', '%' . $value . '%')
						->orWhere('act', 'LIKE', '%' . $value . '%');
				});
		});
	}
}
