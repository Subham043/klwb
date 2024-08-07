<?php

namespace App\Modules\SecurityQuestions\Services;

use App\Modules\SecurityQuestions\Models\SecurityQuestion;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class SecurityQuestionService
{

    protected function model(): Builder
    {
        return SecurityQuestion::whenNotAdmin();
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'question')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ]);
    }

    public function all(): Collection
    {
        return $this->query()
                ->lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        return $this->query()
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): SecurityQuestion|null
    {
        return $this->model()->findOrFail($id);
    }

    public function create(array $data): SecurityQuestion
    {
        return SecurityQuestion::create($data);
    }

    public function update(array $data, SecurityQuestion $question): SecurityQuestion
    {
        $question->update($data);
        return $question;
    }

    public function delete(SecurityQuestion $question): bool|null
    {
        return $question->delete();
    }

}

class CommonFilter implements Filter
{
    public function __invoke(Builder $query, $value, string $property)
    {
        $query->where(function($q) use($value){
            $q->where('question', 'LIKE', '%' . $value . '%');
        });
    }
}
