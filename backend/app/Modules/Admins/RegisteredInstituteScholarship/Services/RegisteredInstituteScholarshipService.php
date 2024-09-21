<?php

namespace App\Modules\Admins\RegisteredInstituteScholarship\Services;

use App\Modules\Students\Scholarship\Models\Application;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class RegisteredInstituteScholarshipService
{
    protected function model(string $reg_institute_id): Builder
    {
        return Application::commonWith()
		->commonRelation()
		->where('school_id', $reg_institute_id);
    }
    protected function query(string $reg_institute_id): QueryBuilder
    {
        return QueryBuilder::for($this->model($reg_institute_id))
                ->defaultSort('-id')
                ->allowedSorts('id')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ]);
    }

    public function all(string $reg_institute_id): Collection
    {
        return $this->query($reg_institute_id)
                ->lazy(100)->collect();
    }

    public function paginate(string $reg_institute_id, Int $total = 10): LengthAwarePaginator
    {
        return $this->query($reg_institute_id)
                ->paginate($total)
                ->appends(request()->query());
    }

    public function excel(string $reg_institute_id) : SimpleExcelWriter
    {
        $model = $this->model($reg_institute_id);
        $i=0;
        $writer = SimpleExcelWriter::streamDownload('institute_scholarships.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
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
                'Scholarship Fee' => $data->mark->graduation->scholarship_fee->amount ?? 0,
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
            if($i==1000){
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
        $query->where(function($q) use($value){
            $q->where('application_year', 'LIKE', '%' . $value . '%')
            ->orWhere('uniq', 'LIKE', '%' . $value . '%')
            ->orWhereHas('student', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%')
                ->orWhere('email', 'LIKE', '%' . $value . '%')
                ->orWhere('phone', 'LIKE', '%' . $value . '%');
            })
            ->orWhereHas('institute', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%');
            })
            ->orWhereHas('industry', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%');
            })
            ->orWhereHas('basic_detail', function($q) use($value){
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
            ->orWhereHas('mark', function($q) use($value){
                $q->where('prv_class', 'LIKE', '%' . $value . '%')
                ->orWhere('prv_marks', 'LIKE', '%' . $value . '%')
                ->orWhereHas('graduation', function($qry) use($value){
                    $qry->where('name', 'LIKE', '%' . $value . '%')
                    ->orWhereHas('scholarship_fee', function($q) use($value){
                        $q->where('amount', 'LIKE', '%' . $value . '%');
                    });
                })
                ->orWhereHas('class', function($qry) use($value){
                    $qry->where('name', 'LIKE', '%' . $value . '%');
                })
                ->orWhereHas('course', function($qry) use($value){
                    $qry->where('name', 'LIKE', '%' . $value . '%');
                });
            })
            ->orWhereHas('company', function($q) use($value){
                $q->where('who_working', 'LIKE', '%' . $value . '%')
                ->orWhere('name', 'LIKE', '%' . $value . '%')
                ->orWhere('relationship', 'LIKE', '%' . $value . '%')
                ->orWhere('msalary', 'LIKE', '%' . $value . '%')
                ->orWhere('pincode', 'LIKE', '%' . $value . '%')
                ->orWhereHas('district', function($qry) use($value){
                    $qry->where('name', 'LIKE', '%' . $value . '%');
                })
                ->orWhereHas('taluq', function($qry) use($value){
                    $qry->where('name', 'LIKE', '%' . $value . '%');
                });
            })
            ->orWhereHas('account', function($q) use($value){
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