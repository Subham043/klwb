<?php

namespace App\Modules\Finance\Scholarship\Services;

use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;
use App\Modules\Students\Scholarship\Models\Application;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class FinanceScholarshipService
{

	protected function model(): Builder
	{
		return Application::commonWith()
			->commonRelation()
			->inAdminStage()
			->applicationIsActive()
			->isApplicationApproved();
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-id')
			->allowedSorts('id', 'application_year')
			->allowedFilters([
				AllowedFilter::custom('search', new CommonFilter, null, false),
				AllowedFilter::callback('payment_status', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						if ($value == 'processed') {
							$query->where('pay_status', ApplicationStatus::Approve->value);
						}
						if ($value == 'failed') {
							$query->where('pay_status', ApplicationStatus::Reject->value);
						}
						if ($value == 'pending') {
							$query->where('pay_status', ApplicationStatus::Pending->value);
						}
					});
				}),
				AllowedFilter::callback('has_gender', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereHas('basic_detail', function ($qry) use ($value) {
							$qry->where('gender', $value);
						});
					});
				}),
				AllowedFilter::callback('has_category', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereHas('basic_detail', function ($qry) use ($value) {
							$qry->where('category', $value);
						});
					});
				}),
				AllowedFilter::callback('has_graduation', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereHas('mark', function ($qry) use ($value) {
							$qry->where('graduation_id', $value);
						});
					});
				}),
				AllowedFilter::callback('has_course', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereHas('mark', function ($qry) use ($value) {
							$qry->where('course_id', $value);
						});
					});
				}),
				AllowedFilter::callback('has_class', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereHas('mark', function ($qry) use ($value) {
							$qry->where('class_id', $value);
						});
					});
				}),
				AllowedFilter::callback('has_city', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						// $query->whereHas('company', function ($qry) use ($value) {
						// 	$qry->where('district_id', $value);
						// });
						$query->whereHas('mark', function ($qry) use ($value) {
							$qry->where('ins_district_id', $value);
						});
					});
				}),
				AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						// $query->whereHas('company', function ($qry) use ($value) {
						// 	$qry->where('taluq_id', $value);
						// });
						$query->whereHas('mark', function ($qry) use ($value) {
							$qry->where('ins_taluq_id', $value);
						});
					});
				}),
				AllowedFilter::callback('year', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->where('application_year', $value);
					});
				}),
			]);
	}

	public function getExcelQuery(): QueryBuilder
	{
		return $this->query();
	}

	public function getLatest(): Application|null
	{
		return $this->model()
			->latest('id')
			->first();
	}

	public function getById(string $id): Application|null
	{
		return $this->model()
			->where('id', $id)
			->latest('id')
			->firstOrFail();
	}

	public function industryPaymentWrapper(Application|null $application): Application
	{
		$newApp = clone $application;
		if(!$newApp) return $newApp;
		$payments_container = [];
			$payments = $this->getIndustryCompletedPayments([$newApp->company_id], $newApp->application_year);
			foreach($payments as $payment){
							array_push($payments_container, $payment);
			}
			$newApp->industryPaymentInfo = collect($payments_container)->where('comp_regd_id', $newApp->company_id)->where('year', $newApp->application_year)->first() ?? null;
		return $newApp;
	}

	private function getIndustryCompletedPayments($comp_regd_id, $year): Collection
	{
		return Payment::whereIn('comp_regd_id', array_unique($comp_regd_id))->where('status', PaymentStatus::Success->value)->where('payments.year', '=', $year)->orderBy('year', 'desc')->get();
	}
	
	public function getMultipleByIds(array $ids): Collection
	{
		return $this->model()
			->whereIn('id', $ids)
			->latest('id')
			->get();
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
	}


	public function getTotalApplicationCount(): int
	{
		return Application::whereApplicationStage(ApplicationState::Admin)->isApplicationApproved()->applicationIsActive()
			->count();
	}

	public function getTotalApprovedApplicationCount(): int
	{
		return Application::whereApplicationStage(ApplicationState::Admin)->isApplicationApproved()->where('pay_status', ApplicationStatus::Approve->value)->applicationIsActive()->count();
	}

	public function getTotalRejectedApplicationCount(): int
	{
		return Application::whereApplicationStage(ApplicationState::Admin)->isApplicationApproved()->where('pay_status', ApplicationStatus::Reject->value)->applicationIsActive()->count();
	}

	public function getTotalPendingApplicationCount(): int
	{
		return Application::whereApplicationStage(ApplicationState::Admin)->isApplicationApproved()->where('pay_status', ApplicationStatus::Pending->value)->applicationIsActive()->count();
	}

	public function excel(): SimpleExcelWriter
	{
		set_time_limit(0); // Removes the time limit

		$page = 1;
		$perPage = 1000; // Number of items per page
		$writer = SimpleExcelWriter::streamDownload('applications.xlsx');

		do {
						// Set the current page for pagination
						Paginator::currentPageResolver(function () use ($page) {
										return $page;
						});

						// Retrieve the paginated data
						$paginator = $this->getList($perPage);
						$items = $paginator->items();

						// Write each item to the Excel file
						foreach ($items as $data) {
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
														'Amount' => $data->mark->graduation->scholarship_fee->amount ?? '0',
														'Application Year' => $data->application_year,
														'Applied Date' => $data->date->format('Y-m-d'),
										]);
						}

						// Move to the next page
						$page++;
						flush();
		} while ($page <= $paginator->lastPage());

		// Close the writer and return the download response
		$writer->close();

		return $writer;
	}

}


class CommonFilter implements Filter
{
	public function __invoke(Builder $query, $value, string $property)
	{
		$query->where(function ($q) use ($value) {
			$q->where('application_year', 'LIKE', '%' . $value . '%')
				->orWhere('id', 'LIKE', '%' . $value . '%')
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
