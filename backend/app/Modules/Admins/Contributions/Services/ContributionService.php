<?php

namespace App\Modules\Admins\Contributions\Services;

use App\Modules\Admins\RequestIndustry\Enums\Act;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
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
				AllowedFilter::custom('search', new CommonFilter, null, false),
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

	public function getLatestByYear(): Payment
	{
		return $this->model()->orderBy('year', 'desc')
			->firstOrFail();
	}

	public function getById(string $id): Payment
	{
		return $this->model()
			->where('id', $id)
			->latest('id')
			->firstOrFail();
	}

	public function getPaymentCompletedById(string $id): Payment
	{
		return $this->model()
			->where('id', $id)
			->where('status', 1)
			->latest('id')
			->firstOrFail();
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
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
				'Act' => Act::getValue($data->industry->act) ?? '',
				'Category' => $data->industry->category ?? '',
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
						->orWhere('act', 'LIKE', '%' . $value . '%')
						->orWhere('category', 'LIKE', '%' . $value . '%');
				});
		});
	}
}
