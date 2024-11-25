<?php

namespace App\Modules\Admins\Scholarship\Services;

use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Models\Application;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class AdminScholarshipService
{

	protected function model(): Builder
	{
		return Application::commonWith()
			->commonRelation()
			->with('approved_by');
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-id')
			->allowedSorts('id', 'year')
			->allowedFilters([
				'application_year',
				AllowedFilter::custom('search', new CommonFilter, null, false),
				AllowedFilter::callback('status', function (Builder $query, $value) {
					if ($value == 'approved') {
						$query->isApplicationApproved()->inAdminStage();
					}
					if ($value == 'processing') {
						$query->where('application_state', '<', ApplicationState::Admin->value)->isApplicationPending();
					}
					if ($value == 'rejected') {
						$query->isApplicationRejected();
					}
					if ($value == 'pending') {
						$query->isApplicationPending()->inAdminStage();
					}
					if ($value == 'payment_processed') {
						$query->isApplicationApproved()->inAdminStage()->isPaymentProcessed();
					}
				}),
				AllowedFilter::callback('has_gender', function (Builder $query, $value) {
					$query->whereHas('basic_detail', function ($qry) use ($value) {
						$qry->where('gender', $value);
					});
				}),
				AllowedFilter::callback('has_category', function (Builder $query, $value) {
					$query->whereHas('basic_detail', function ($qry) use ($value) {
						$qry->where('category', $value);
					});
				}),
				AllowedFilter::callback('has_graduation', function (Builder $query, $value) {
					$query->whereHas('mark', function ($qry) use ($value) {
						$qry->where('graduation_id', $value);
					});
				}),
				AllowedFilter::callback('has_course', function (Builder $query, $value) {
					$query->whereHas('mark', function ($qry) use ($value) {
						$qry->where('course_id', $value);
					});
				}),
				AllowedFilter::callback('has_class', function (Builder $query, $value) {
					$query->whereHas('mark', function ($qry) use ($value) {
						$qry->where('class_id', $value);
					});
				}),
				AllowedFilter::callback('has_city', function (Builder $query, $value) {
					$query->whereHas('mark', function ($qry) use ($value) {
						$qry->where('ins_district_id', $value);
					});
				}),
				AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
					$query->whereHas('mark', function ($qry) use ($value) {
						$qry->where('ins_taluq_id', $value);
					});
				}),
			]);
	}

	public function getLatest(): Application|null
	{
		return $this->model()
			->latest()
			->first();
	}

	public function getById(string $id): Application|null
	{
		return $this->model()
			->where('id', $id)
			->latest()
			->firstOrFail();
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
	}


	public function getTotalApplicationCount(): int
	{
		return Application::count();
	}

	public function getTotalApprovedApplicationCount(): int
	{
		return Application::where(function ($qry) {
			$qry->inAdminStage()->isApplicationApproved();
		})->count();
	}

	public function getTotalRejectedApplicationCount(): int
	{
		return Application::where(function ($qry) {
			$qry->inAdminStage()->isApplicationRejected();
		})->count();
	}

	public function getTotalPendingApplicationCount(): int
	{
		return Application::where(function ($qry) {
			$qry->inAdminStage()->isApplicationPending();
		})->count();
	}

	public function excel(): SimpleExcelWriter
	{
		$model = $this->model();
		$i = 0;
		$writer = SimpleExcelWriter::streamDownload('applications.xlsx');
		foreach ($model->lazy(1000)->collect() as $data) {
			$writer->addRow([
				'Id' => $data->id,
				'Name' => $data->basic_detail->name,
				'Mobile' => $data->student->phone,
				'Email' => $data->student->email,
				'Aadhar No' => $data->basic_detail->adharcard_no,
				'Father Aadhar No' => $data->basic_detail->f_adhar,
				'Mother Aadhar No' => $data->basic_detail->m_adhar,
				'Institute' => $data->institute->name ?? null,
				'Industry' => $data->industry->name ?? null,
				'Graduation' => $data->mark->graduation->name,
				'Course' => $data->mark->course->name,
				'Class' => $data->mark->class->name,
				'District' => $data->mark->district->name,
				'Taluq' => $data->mark->taluq->name,
				'Amount' => $data->mark->graduation->scholarship_fee->amount ?? 0,
				'Application Year' => $data->application_year,
				'Applied Date' => $data->date->format('Y-m-d'),
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
			$q->where('application_year', 'LIKE', '%' . $value . '%')
				->orWhere('uniq', 'LIKE', '%' . $value . '%')
				->orWhereHas('student', function ($q) use ($value) {
					$q->where('name', 'LIKE', '%' . $value . '%')
						->orWhere('email', 'LIKE', '%' . $value . '%')
						->orWhere('phone', 'LIKE', '%' . $value . '%');
				})
				->orWhereHas('institute', function ($q) use ($value) {
					$q->where('name', 'LIKE', '%' . $value . '%');
				})
				->orWhereHas('industry', function ($q) use ($value) {
					$q->where('name', 'LIKE', '%' . $value . '%');
				})
				->orWhereHas('basic_detail', function ($q) use ($value) {
					$q->where('name', 'LIKE', '%' . $value . '%')
						->orWhere('father_name', 'LIKE', '%' . $value . '%')
						->orWhere('address', 'LIKE', '%' . $value . '%')
						->orWhere('parent_phone', 'LIKE', '%' . $value . '%')
						->orWhere('category', 'LIKE', '%' . $value . '%')
						->orWhere('cast_no', 'LIKE', '%' . $value . '%')
						->orWhere('adharcard_no', 'LIKE', '%' . $value . '%')
						->orWhere('gender', 'LIKE', '%' . $value . '%')
						->orWhere('f_adhar', 'LIKE', '%' . $value . '%')
						->orWhere('m_adhar', 'LIKE', '%' . $value . '%')
						->orWhere('mother_name', 'LIKE', '%' . $value . '%');
				})
				->orWhereHas('mark', function ($q) use ($value) {
					$q->where('prv_class', 'LIKE', '%' . $value . '%')
						->orWhere('prv_marks', 'LIKE', '%' . $value . '%')
						->orWhereHas('graduation', function ($qry) use ($value) {
							$qry->where('name', 'LIKE', '%' . $value . '%')
								->orWhereHas('scholarship_fee', function ($q) use ($value) {
									$q->where('amount', 'LIKE', '%' . $value . '%');
								});
						})
						->orWhereHas('class', function ($qry) use ($value) {
							$qry->where('name', 'LIKE', '%' . $value . '%');
						})
						->orWhereHas('course', function ($qry) use ($value) {
							$qry->where('name', 'LIKE', '%' . $value . '%');
						});
				})
				->orWhereHas('company', function ($q) use ($value) {
					$q->where('who_working', 'LIKE', '%' . $value . '%')
						->orWhere('name', 'LIKE', '%' . $value . '%')
						->orWhere('relationship', 'LIKE', '%' . $value . '%')
						->orWhere('msalary', 'LIKE', '%' . $value . '%')
						->orWhere('pincode', 'LIKE', '%' . $value . '%')
						->orWhereHas('district', function ($qry) use ($value) {
							$qry->where('name', 'LIKE', '%' . $value . '%');
						})
						->orWhereHas('taluq', function ($qry) use ($value) {
							$qry->where('name', 'LIKE', '%' . $value . '%');
						});
				})
				->orWhereHas('account', function ($q) use ($value) {
					$q->where('branch', 'LIKE', '%' . $value . '%')
						->orWhere('name', 'LIKE', '%' . $value . '%')
						->orWhere('ifsc', 'LIKE', '%' . $value . '%')
						->orWhere('acc_no', 'LIKE', '%' . $value . '%')
						->orWhere('holder', 'LIKE', '%' . $value . '%')
						->orWhere('type', 'LIKE', '%' . $value . '%');
				});
		});
	}
}
