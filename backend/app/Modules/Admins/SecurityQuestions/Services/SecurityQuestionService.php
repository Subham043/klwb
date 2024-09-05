<?php

namespace App\Modules\Admins\SecurityQuestions\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Modules\Admins\SecurityQuestions\Models\SecurityQuestion;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class SecurityQuestionService extends AbstractExcelService
{
    public function model(): Builder
    {
        return SecurityQuestion::whenNotAdmin();
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
            ->defaultSort('-id')
            ->allowedSorts('id', 'question')
            ->allowedFilters([
                AllowedFilter::custom('search', new CommonFilter, null, false),
            ]);
    }

    public function excel(): SimpleExcelWriter
    {
        $model = $this->model();
        $i = 0;
        $writer = SimpleExcelWriter::streamDownload('security_questions.xlsx');
        foreach ($model->lazy(1000)->collect() as $data) {
            $writer->addRow([
                'Id' => $data->id,
                'Question' => $data->question,
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
            $q->where('question', 'LIKE', '%' . $value . '%');
        });
    }
}
