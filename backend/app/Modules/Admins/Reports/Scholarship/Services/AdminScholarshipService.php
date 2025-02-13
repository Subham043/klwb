<?php

namespace App\Modules\Admins\Reports\Scholarship\Services;

use App\Modules\Students\Scholarship\Models\Application;
use Spatie\QueryBuilder\QueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
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
		->join('application_companies', 'application_companies.application_id', '=', 'applications.id')
		->groupBy(DB::raw('applications.application_year'));
	}
	protected function query(): QueryBuilder
	{
		return QueryBuilder::for($this->model())
			->defaultSort('-application_year')
			->allowedSorts('application_year')
			->allowedFilters([
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
				AllowedFilter::callback('year', function (Builder $query, $value) {
					$query->where('applications.application_year', $value);
				}),
			]);
	}

	public function getExcelQuery(): QueryBuilder
	{
		return $this->query();
	}

	public function getList(Int $total = 10): LengthAwarePaginator
	{
		return $this->query()->paginate($total)
			->appends(request()->query());
	}

	public function excel(): SimpleExcelWriter
	{
		set_time_limit(0); // Removes the time limit

		$page = 1;
		$perPage = 1000; // Number of items per page
		$writer = SimpleExcelWriter::streamDownload('scholarship_report.xlsx');

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
