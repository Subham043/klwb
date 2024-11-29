<?php

namespace App\Modules\Admins\Reports\Contributions\Services;

use App\Modules\Admins\Industries\Models\Industry;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;

class NonContributionService
{

	protected function model(): Builder
	{
		return Industry::whenNotAdmin()->where(function ($query) {
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
				AllowedFilter::callback('has_year', function (Builder $query, $value) {
					$query->doesntHave('payments')->orWhere(function ($qry) use ($value){
						$qry->whereHas('payments', function ($q) use ($value) {
							$q->where('status', '!=', PaymentStatus::Success->value)->where('year', $value);
						});
					});
				}),
			]);
	}

	public function getCount()
	{
		return $this->query()->count();
	}
}
