<?php

namespace App\Modules\Admins\Scholarship\Services;

use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Models\Application;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;
use Illuminate\Support\Collection;

class AdminScholarshipService
{

	protected function model(): Builder
	{
		return Application::commonWith()
			->commonRelation()
			->applicationIsActive()
			->with([
				'approved_by',
			]);
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-id')
			->allowedSorts('id', 'application_year')
			->allowedFilters([
				AllowedFilter::custom('search', new CommonFilter, null, false),
				AllowedFilter::callback('status', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
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
						$query->whereHas('company', function ($qry) use ($value) {
							$qry->where('district_id', $value);
						});
						// $query->whereHas('mark', function ($qry) use ($value) {
						// 	$qry->where('ins_district_id', $value);
						// });
					});
				}),
				AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
					$query->where(function ($query) use ($value) {
						$query->whereHas('company', function ($qry) use ($value) {
							$qry->where('taluq_id', $value);
						});
						// $query->whereHas('mark', function ($qry) use ($value) {
						// 	$qry->where('ins_taluq_id', $value);
						// });
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

	public function industryPaymentWrapper(Application|null $application): Application|null
	{
		$newApp = clone $application;
		if (!$newApp) return $newApp;
		$applicationChecks = new ScholarshipApplicationChecksService();
		$newApp->can_approve = $applicationChecks->canAdminApproveReject($newApp);
		$payments_container = [];
		$payments = $this->getIndustryCompletedPayments([$newApp->company_id], ($newApp->application_year-1));
		foreach ($payments as $payment) {
			array_push($payments_container, $payment);
		}
		$newApp->industryPaymentInfo = collect($payments_container)->where('comp_regd_id', $newApp->company_id)->where('year', ($newApp->application_year-1))->first() ?? null;
		return $newApp;
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
		$data = $this->query()->paginate($total)
			->appends(request()->query());
		return $this->wrapApplicationList($data);
	}

	public function wrapApplicationList(LengthAwarePaginator $data): LengthAwarePaginator
	{
		$industry_ids = [];
		$applicationChecks = new ScholarshipApplicationChecksService();
		$applications = $data->through(function ($application) use ($applicationChecks, &$industry_ids) {
			array_push($industry_ids, ["application_year" => $application->application_year, "company_id" => $application->company_id]);
			$application->can_approve = $applicationChecks->canAdminApproveReject($application);
			return $application;
		});
		$grouped = collect($industry_ids)
			->groupBy('application_year')
			->map(function (Collection $items) {
				return $items->pluck('company_id')->all();
			})
			->toArray();
		$payments_container = [];
		foreach ($grouped as $key => $value) {
			$payments = $this->getIndustryCompletedPayments($value, ($key-1));
			foreach ($payments as $payment) {
				array_push($payments_container, $payment);
			}
		}
		$applications = $applications->through(function ($application) use ($payments_container) {
			$application->industryPaymentInfo = collect($payments_container)->where('comp_regd_id', $application->company_id)->where('year', ($application->application_year-1))->first() ?? null;
			return $application;
		});
		return $applications;
	}

	private function getIndustryCompletedPayments($comp_regd_id, $year): Collection
	{
		return Payment::whereIn('comp_regd_id', array_unique($comp_regd_id))->where('status', PaymentStatus::Success->value)->where('payments.year', '=', $year)->orderBy('year', 'desc')->get();
	}

	public function getTotalApplicationCount(): int
	{
		return Application::applicationIsActive()->count();
	}

	public function getTotalApprovedApplicationCount(): int
	{
		return Application::where(function ($qry) {
			$qry->inAdminStage()->isApplicationApproved();
		})->applicationIsActive()->count();
	}

	public function getTotalRejectedApplicationCount(): int
	{
		return Application::where(function ($qry) {
			$qry->inAdminStage()->isApplicationRejected();
		})->applicationIsActive()->count();
	}

	public function getTotalPendingApplicationCount(): int
	{
		return Application::where(function ($qry) {
			$qry->inAdminStage()->isApplicationPending();
		})->applicationIsActive()->count();
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
					'Father\'s Name' => $data->basic_detail->father_name,
					'Mohter\'s Name' => $data->basic_detail->mother_name,
					'Phone' => $data->basic_detail->parent_phone,
					'Gender' => $data->basic_detail->gender,
					'Category' => $data->basic_detail->category,
					'Cast No.' => $data->basic_detail->cast_no,
					'Adhar Card Number' => $data->basic_detail->adharcard_no,
					'Father\'s Adhar Card Number' => $data->basic_detail->f_adhar,
					'Mother\'s Adhar Card Number' => $data->basic_detail->m_adhar,
					'Institute' => $data->institute->name,
					'Industry' => $data->industry->name,
					'Graduation' => $data->mark->graduation->name,
					'Course' => $data->mark->course->name,
					'Class' => $data->mark->class->name,
					'Previous Class' => $data->mark->prv_class,
					'Previous Marks' => $data->mark->prv_marks,
					'Scholarship Fee' => $data->mark->graduation->scholarship_fee->amount ?? '0',
					'Whos\'s Working' => $data->company->who_working_text,
					'Parent \ Guardian Name' => $data->company->name,
					'Relationship' => $data->company->relationship,
					'Monthly Salary' => $data->company->msalary,
					'Pincode' => $data->company->pincode,
					'District' => $data->company->district->name,
					'Taluq' => $data->company->taluq->name,
					'Bank Name' => $data->account->name,
					'Branch Name' => $data->account->branch,
					'IFSC Code' => $data->account->ifsc,
					'Account Number' => $data->account->acc_no,
					'Account Holder Name' => $data->account->holder,
					'Account Type' => $data->account->account_type,
					'Application Year' => $data->application_year,
					'Submitted On' => $data->date->format('Y-m-d H:i:s'),
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
