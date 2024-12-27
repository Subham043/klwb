<?php

namespace App\Modules\Students\Scholarship\Services;

use App\Http\Enums\Guards;
use App\Http\Services\FileService;
use App\Modules\Admins\ApplicationDates\Services\ScholarshipApplicationChecksService;
use App\Modules\Students\Scholarship\Enums\ApplicationState;
use App\Modules\Students\Scholarship\Enums\ApplicationStatus;
use App\Modules\Students\Scholarship\Enums\NotApplicable;
use App\Modules\Students\Scholarship\Models\Application;
use App\Modules\Students\Scholarship\Models\ApplicationAccount;
use App\Modules\Students\Scholarship\Models\ApplicationBasicDetail;
use App\Modules\Students\Scholarship\Models\ApplicationCompany;
use App\Modules\Students\Scholarship\Models\ApplicationMark;
use App\Modules\Students\Scholarship\Requests\ApplyScholarshipRequest;
use App\Modules\Students\Scholarship\Requests\ResubmitScholarshipRequest;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class ScholarshipService
{

	public function __construct(private ScholarshipApplicationChecksService $applicationChecks) {}

	public function apply(ApplyScholarshipRequest $request): Application
	{
		if (!$this->applicationChecks->areScholarshipApplicationOpen()) {
			throw new \Exception('You can not apply for scholarship as application is not open yet.', 400);
		}
		if (!$this->applicationChecks->isEligibleForScholarship()) {
			throw new \Exception('You have already applied scholarship for this year', 400);
		}
		$application_date = $this->applicationChecks->getLatestApplicationDate();
		$application = Application::create([
			'application_year' => $application_date->application_year,
			'student_id' => auth()->guard(Guards::Web->value())->user()->id,
			'school_id' => $request->school_id,
			'company_id' => $request->company_id,
			'status' => ApplicationStatus::Pending->value,
			'application_state' => ApplicationState::School->value,
			'date' => now(),
			'application_date_id' => $application_date->id,
		]);
		$this->store_basic_detail($request, $application);
		$this->store_mark($request, $application);
		$this->store_account($request, $application);
		$this->store_company($request, $application);
		return $application;
	}

	protected function store_basic_detail(ApplyScholarshipRequest $request, Application $application)
	{
		$basic_detail = [
			'name' => $request->name,
			'father_name' => $request->father_name,
			'mother_name' => $request->mother_name,
			'address' => $request->address,
			'parent_phone' => $request->parent_phone,
			'gender' => $request->gender,
			'is_scst' => $request->is_scst,
			'category' => $request->category,
			'adharcard_no' => $request->adharcard_no,
			'not_applicable' => $request->not_applicable,
		];
		if ($request->is_scst) {
			$basic_detail['cast_no'] = $request->cast_no;
			if ($request->hasFile('cast_certificate')) {
				$basic_detail['cast_certificate'] = (new FileService)->save_file('cast_certificate', (new ApplicationBasicDetail)->cast_certificate_path);
			}
		}
		if ($request->hasFile('adharcard_file')) {
			$basic_detail['adharcard_file'] = (new FileService)->save_file('adharcard_file', (new ApplicationBasicDetail)->adharcard_file_path);
		}
		if (!empty($request->not_applicable) && ($request->not_applicable == NotApplicable::Mother->value || $request->not_applicable == NotApplicable::Father->value)) {
			if ($request->hasFile('deathcertificate')) {
				$basic_detail['deathcertificate'] = (new FileService)->save_file('deathcertificate', (new ApplicationBasicDetail)->deathcertificate_path);
			}
		}
		if (empty($request->not_applicable) || (!empty($request->not_applicable) && $request->not_applicable == NotApplicable::Mother->value)) {
			$basic_detail['f_adhar'] = $request->f_adhar;
			if ($request->hasFile('f_adharfile')) {
				$basic_detail['f_adharfile'] = (new FileService)->save_file('f_adharfile', (new ApplicationBasicDetail)->f_adharfile_path);
			}
		}
		if (empty($request->not_applicable) || (!empty($request->not_applicable) && $request->not_applicable == NotApplicable::Father->value)) {
			$basic_detail['m_adhar'] = $request->m_adhar;
			if ($request->hasFile('m_adharfile')) {
				$basic_detail['m_adharfile'] = (new FileService)->save_file('m_adharfile', (new ApplicationBasicDetail)->m_adharfile_path);
			}
		}
		$application->basic_detail()->create($basic_detail);
	}

	protected function store_mark(ApplyScholarshipRequest $request, Application $application)
	{
		$mark = [
			'graduation_id' => $request->graduation_id,
			'course_id' => $request->course_id,
			'class_id' => $request->class_id,
			'ins_pin' => $request->ins_pin,
			'ins_district_id' => $request->ins_district_id,
			'ins_taluq_id' => $request->ins_taluq_id,
			'prv_class' => $request->prv_class,
			'prv_marks' => $request->prv_marks,
		];
		if ($request->hasFile('prv_markcard')) {
			$mark['prv_markcard'] = (new FileService)->save_file('prv_markcard', (new ApplicationMark)->prv_markcard_path);
		}
		if (!$request->marks_card_type && $request->hasFile('prv_markcard2')) {
			$mark['prv_markcard2'] = (new FileService)->save_file('prv_markcard2', (new ApplicationMark)->prv_markcard2_path);
		}
		$application->mark()->create($mark);
	}

	protected function store_account(ApplyScholarshipRequest $request, Application $application)
	{
		$account = [
			'type' => $request->type,
			'name' => $request->bank_name,
			'branch' => $request->branch,
			'ifsc' => $request->ifsc,
			'acc_no' => $request->acc_no,
			'holder' => $request->holder,
		];
		if ($request->hasFile('passbook')) {
			$account['passbook'] = (new FileService)->save_file('passbook', (new ApplicationAccount)->passbook_path);
		}
		$application->account()->create($account);
	}

	protected function store_company(ApplyScholarshipRequest $request, Application $application)
	{
		$company = [
			'who_working' => $request->who_working,
			'name' => $request->parent_guardian_name,
			'relationship' => $request->relationship,
			'msalary' => $request->msalary,
			'pincode' => $request->pincode,
			'district_id' => $request->district_id,
			'taluq_id' => $request->taluq_id,
		];
		if ($request->hasFile('salaryslip')) {
			$company['salaryslip'] = (new FileService)->save_file('salaryslip', (new ApplicationCompany)->salaryslip_path);
		}
		$application->company()->create($company);
	}

	public function resubmit(ResubmitScholarshipRequest $request, Application $application): Application
	{
		if ($this->applicationChecks->isEligibleForScholarship() && !$this->applicationChecks->canResubmit($application)) {
			throw new \Exception('You can not resubmit as application is not open yet.', 400);
		}
		$application->update([
			'school_id' => $request->school_id,
			'company_id' => $request->company_id,
			'status' => ApplicationStatus::Pending->value,
			'resubmitted_status' => true
		]);

		$account = [
			'type' => $request->type,
			'name' => $request->bank_name,
			'branch' => $request->branch,
			'ifsc' => $request->ifsc,
			'acc_no' => $request->acc_no,
			'holder' => $request->holder,
		];
		if ($request->hasFile('passbook')) {
			$account['passbook'] = (new FileService)->save_file('passbook', (new ApplicationAccount)->passbook_path);
		}
		$application->account->update($account);

		$company = [
			'who_working' => $request->who_working,
			'name' => $request->parent_guardian_name,
			'relationship' => $request->relationship,
			'msalary' => $request->msalary,
			'pincode' => $request->pincode,
			'district_id' => $request->district_id,
			'taluq_id' => $request->taluq_id,
		];
		if ($request->hasFile('salaryslip')) {
			$company['salaryslip'] = (new FileService)->save_file('salaryslip', (new ApplicationCompany)->salaryslip_path);
		}
		$application->company->update($company);

		$mark = [
			'graduation_id' => $request->graduation_id,
			'course_id' => $request->course_id,
			'class_id' => $request->class_id,
			'ins_pin' => $request->ins_pin,
			'ins_district_id' => $request->ins_district_id,
			'ins_taluq_id' => $request->ins_taluq_id,
			'prv_class' => $request->prv_class,
			'prv_marks' => $request->prv_marks,
		];
		if ($request->hasFile('prv_markcard')) {
			$mark['prv_markcard'] = (new FileService)->save_file('prv_markcard', (new ApplicationMark)->prv_markcard_path);
		}
		if (!$request->marks_card_type && $request->hasFile('prv_markcard2')) {
			$mark['prv_markcard2'] = (new FileService)->save_file('prv_markcard2', (new ApplicationMark)->prv_markcard2_path);
		}
		$application->mark->update($mark);

		$basic_detail = [
			'name' => $request->name,
			'father_name' => $request->father_name,
			'mother_name' => $request->mother_name,
			'address' => $request->address,
			'parent_phone' => $request->parent_phone,
			'gender' => $request->gender,
			'is_scst' => $request->is_scst,
			'category' => $request->category,
			'adharcard_no' => $request->adharcard_no,
			'not_applicable' => $request->not_applicable,
		];
		if ($request->is_scst) {
			$basic_detail['cast_no'] = $request->cast_no;
			if ($request->hasFile('cast_certificate')) {
				$basic_detail['cast_certificate'] = (new FileService)->save_file('cast_certificate', (new ApplicationBasicDetail)->cast_certificate_path);
			}
		}
		if ($request->hasFile('adharcard_file')) {
			$basic_detail['adharcard_file'] = (new FileService)->save_file('adharcard_file', (new ApplicationBasicDetail)->adharcard_file_path);
		}
		if (!empty($request->not_applicable) && ($request->not_applicable == NotApplicable::Mother->value || $request->not_applicable == NotApplicable::Father->value)) {
			if ($request->hasFile('deathcertificate')) {
				$basic_detail['deathcertificate'] = (new FileService)->save_file('deathcertificate', (new ApplicationBasicDetail)->deathcertificate_path);
			}
		}
		if (empty($request->not_applicable) || (!empty($request->not_applicable) && $request->not_applicable == NotApplicable::Mother->value)) {
			$basic_detail['f_adhar'] = $request->f_adhar;
			if ($request->hasFile('f_adharfile')) {
				$basic_detail['f_adharfile'] = (new FileService)->save_file('f_adharfile', (new ApplicationBasicDetail)->f_adharfile_path);
			}
		}
		if (empty($request->not_applicable) || (!empty($request->not_applicable) && $request->not_applicable == NotApplicable::Father->value)) {
			$basic_detail['m_adhar'] = $request->m_adhar;
			if ($request->hasFile('m_adharfile')) {
				$basic_detail['m_adharfile'] = (new FileService)->save_file('m_adharfile', (new ApplicationBasicDetail)->m_adharfile_path);
			}
		}
		$application->basic_detail->update($basic_detail);

		$application->refresh();
		return $application;
	}

	protected function model(): Builder
	{
		return Application::commonWith()
			->commonRelation()
			->applicationIsActive()
			->belongsToAuthStudent();
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-id')
			->allowedSorts('id', 'application_year')
			->allowedFilters([
				AllowedFilter::custom('search', new CommonFilter, null, false),
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

	public function getTotalApplicationCount(): int
	{
		return Application::belongsToAuthStudent()->applicationIsActive()->count();
	}

	public function getTotalApprovedApplicationCount(): int
	{
		return Application::belongsToAuthStudent()->where(function ($qry) {
			$qry->isApplicationApproved();
		})->applicationIsActive()->count();
	}

	public function getTotalRejectedApplicationCount(): int
	{
		return Application::belongsToAuthStudent()->where(function ($qry) {
			$qry->isApplicationRejected();
		})->applicationIsActive()->count();
	}

	public function getTotalScholarshipAmount(): int
	{
		return Application::belongsToAuthStudent()->with([
			'mark' => fn($query) => $query->with(['graduation' => fn($q) => $q->with('scholarship_fee')]),
		])->applicationIsActive()->whereApplicationStageGreaterThan(ApplicationState::Govt)->whereNotApplicationStatus(ApplicationStatus::Reject)->get()->sum('mark.graduation.scholarship_fee.amount');
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
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
