<?php

namespace App\Modules\IndustryManagement\Payment\Services;

use App\Http\Enums\Guards;
use App\Http\Services\FileService;
use App\Modules\Admins\Industries\Models\Industry;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use App\Modules\IndustryManagement\Payment\Requests\PaymentRequest;
use Carbon\Carbon;
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
			->defaultSort('-year')
			->allowedSorts('id', 'year')
			->allowedFilters([
				'year',
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
			->latest('id')
			->firstOrFail();
	}

	public function getById(string $id): Payment
	{
		return $this->model()
			->where('id', $id)
			->latest('id')
			->firstOrFail();
	}

	public function getPaymentPendingById(string $id): Payment
	{
		return Payment::with('industry')
			->where('id', $id)
			->where('status', 0)
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

	public function getPaidYears()
	{
		return $this->query()->where('status', 1)->lazy(100)->collect()
			->pluck('year')->toArray();
	}

	public function makePayment(PaymentRequest $request)
	{
		$file = (new FileService)->save_file('employee_excel', (new Payment)->employee_excel_path);
		$current_year = Carbon::now()->format('Y');
		$current_month = Carbon::now()->format('m');
		$current_day = Carbon::now()->format('d');
		$diff = $current_year - $request->year;
		$selected_date = Carbon::createFromDate($request->year, 1, 1);
		$diff_date = Carbon::createFromDate(($current_year - 1), $current_month, $current_day);
		$month_diff = $selected_date->diffInMonths($diff_date);
		$amount = ($request->male + $request->female) * 60;
		$interest_amount = 0;
		$total_amount = 0;
		if ($diff == 0 || $diff == 1) {
			if ($current_month == 1 && $current_day >= 1 && $current_day <= 15) {
				$total_amount	= $amount + $interest_amount;
			} elseif (($current_month == 1 && $current_day >= 16) || ($current_month <= 3 && $current_day <= 31)) {
				$interest_amount = ((($amount * 12) / 100) / 12) * ceil($month_diff);
				$total_amount	= $amount + $interest_amount;
			} else {
				$interest_amount = ((($amount * 18) / 100) / 12) * ceil($month_diff);
				$total_amount	= $amount + $interest_amount;
			}
		}else{
			$interest_amount = ((($amount * 18) / 100) / 12) * ceil($month_diff);
			$total_amount	= $amount + $interest_amount;
		}
		Industry::where('id', auth()->guard(Guards::Industry->value())->user()->reg_industry_id)
			->update([
				'category' => $request->category,
				'act' => $request->act,
			]);
		return Payment::updateOrCreate([
			'year' => $request->year,
			'comp_regd_id' => auth()->guard(Guards::Industry->value())->user()->reg_industry_id,
			'status' => 0
		], [
			...$request->validated(),
			'comp_regd_id' => auth()->guard(Guards::Industry->value())->user()->reg_industry_id,
			'pay_id' => 'KLWB-' . date('Ydmhis') . rand(1, 10000),
			'employee_excel' => $file,
			'payed_on' => now(),
			'interest' => $interest_amount,
			'price' => $total_amount,
		]);
	}

	public function excel(): SimpleExcelWriter
	{
		$model = $this->query();
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
						->orWhere('category', 'LIKE', '%' . $value . '%')
						->orWhere('act', 'LIKE', '%' . $value . '%');
				});
		});
	}
}
