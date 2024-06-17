<?php

namespace App\Modules\SecurityQuestions\Services;

use App\Modules\SecurityQuestions\Models\SecurityQuestion;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class SecurityQuestionService
{

    public function all(): Collection
    {
        return SecurityQuestion::all();
    }

    public function paginateMain(Int $total = 10): LengthAwarePaginator
    {
        $query = SecurityQuestion::where('is_active', true);
        return QueryBuilder::for($query)
                ->defaultSort('id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = SecurityQuestion::latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): SecurityQuestion|null
    {
        return SecurityQuestion::findOrFail($id);
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
