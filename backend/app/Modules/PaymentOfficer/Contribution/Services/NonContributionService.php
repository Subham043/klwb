<?php

namespace App\Modules\PaymentOfficer\Contribution\Services;

use App\Modules\Admins\Industries\Models\Industry;
use App\Modules\Admins\RequestIndustry\Enums\Act;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class NonContributionService
{

	protected function model(): Builder
	{
		return Industry::isActive()->where(function ($query) {
			$query->doesntHave('payments')->orWhere(function ($qry){
				$qry->whereHas('payments', function ($q) {
					$q->where('status', '!=', PaymentStatus::Success->value);
				});
			});
		});
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-id')
			->allowedSorts('id')
			->allowedFilters([
				AllowedFilter::custom('search', new CommonFilter, null, false),
				AllowedFilter::callback('has_year', function (Builder $query, $value) {
					$query->doesntHave('payments')->orWhere(function ($qry) use ($value){
						$qry->whereHas('payments', function ($q) use ($value) {
							$q->where('status', '!=', PaymentStatus::Success->value)->where('year', $value);
						});
					});
				}),
			]);
	}

	public function getById(string $id): Payment
	{
		return $this->model()
			->where('id', $id)
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
		$writer = SimpleExcelWriter::streamDownload('non-contributions.xlsx');
		foreach ($model->lazy(1000)->collect() as $data) {
			$writer->addRow([
				'Id' => $data->id,
				'Reg ID.' => $data->reg_id,
				'Name' => $data->name,
				'Act' => Act::getValue($data->act) ?? '',
				'Category' => $data->category ?? '',
				'Pincode' => $data->pincode,
				'Active' => $data->is_active ? 'Yes' : 'No',
				'Created At' => $data->created_at->format('Y-m-d H:i:s'),
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
			$q->where('name', 'LIKE', '%' . $value . '%')
			->orWhere('act', 'LIKE', '%' . $value . '%')
			->orWhere('category', 'LIKE', '%' . $value . '%')
			->orWhere('pincode', 'LIKE', '%' . $value . '%')
			->orWhere('reg_id', 'LIKE', '%' . $value . '%');
		});
	}
}
