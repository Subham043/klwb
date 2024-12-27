<?php

namespace App\Modules\Admins\Reports\Scholarship\Services;

use App\Modules\Students\Scholarship\Models\Application;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class AdminScholarshipService
{

	protected function model(): Builder
	{
		return Application::query()
		->selectRaw("applications.application_year as year, 
			COUNT(applications.id) as total_count,
			SUM(CASE WHEN application_basic_details.category = 'sc' THEN 1 ELSE 0 END) as sc_count,
			SUM(CASE WHEN application_basic_details.category = 'st' THEN 1 ELSE 0 END) as st_count,
			SUM(CASE WHEN application_basic_details.category = 'obc' THEN 1 ELSE 0 END) as obc_count,
			SUM(CASE WHEN application_basic_details.category = 'general' THEN 1 ELSE 0 END) as general_count,
			SUM(CASE WHEN applications.status = 0 THEN 1 ELSE 0 END) as pending_count,
			SUM(CASE WHEN applications.status = 2 THEN 1 ELSE 0 END) as rejected_count,
			SUM(CASE WHEN applications.status = 1 AND applications.application_state = 4 THEN 1 ELSE 0 END) as approved_count,
			SUM(CASE WHEN application_basic_details.gender = 'male' THEN 1 ELSE 0 END) as male_count,
			SUM(CASE WHEN application_basic_details.gender = 'female' THEN 1 ELSE 0 END) as female_count")
		->join('application_basic_details', 'application_basic_details.application_id', '=', 'applications.id')
		->join('application_marks', 'application_marks.application_id', '=', 'applications.id')
		->groupBy(DB::raw('applications.application_year'));
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-application_year')
			->allowedSorts('application_year')
			->allowedFilters([
				'application_year',
				AllowedFilter::callback('has_graduation', function (Builder $query, $value) {
					$query->where('application_marks.graduation_id', $value);
				}),
				AllowedFilter::callback('has_course', function (Builder $query, $value) {
					$query->where('application_marks.course_id', $value);
				}),
				AllowedFilter::callback('has_class', function (Builder $query, $value) {
					$query->where('application_marks.class_id', $value);
				}),
				AllowedFilter::callback('has_city', function (Builder $query, $value) {
					$query->where('application_companies.district_id', $value);
				}),
				AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
					$query->where('application_companies.taluq_id', $value);
				}),
			]);
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
		$writer = SimpleExcelWriter::streamDownload('applications_report.xlsx');
		foreach ($model->lazy(1000)->collect() as $data) {
			$writer->addRow([
				'Application Year' => $data->year,
				'SC Count' => $data->sc_count,
				'ST Count' => $data->st_count,
				'OBC Count' => $data->obc_count,
				'General Count' => $data->general_count,
				'Male Count' => $data->male_count,
				'Female Count' => $data->female_count,
				'Pending Application Count' => $data->pending_count,
				'Rejected Application Count' => $data->rejected_count,
				'Approved Application Count' => $data->approved_count,
				'Total Application Count' => $data->total_count,
			]);
			if ($i == 1000) {
				flush();
			}
			$i++;
		}
		return $writer;
	}
}
