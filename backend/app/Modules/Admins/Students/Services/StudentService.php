<?php

namespace App\Modules\Admins\Students\Services;

use App\Http\Abstracts\AbstractAuthenticableExcelService;
use App\Modules\Students\Users\Models\User;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\SimpleExcel\SimpleExcelWriter;

class StudentService extends AbstractAuthenticableExcelService
{

    public function model(): Builder
    {
        return User::with('roles');
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('active_status', function (Builder $query, $value) {
                        if(!empty($value)){
                            if(strtolower($value)=="blocked"){
                                $query->where('is_blocked', true);
                            }else{
                                $query->where('is_blocked', false);
                            }
                        }
                    }),
                    AllowedFilter::callback('verification_status', function (Builder $query, $value) {
                        if(!empty($value)){
                            if(strtolower($value)=="verified"){
                                $query->whereNotNull('verified_at');
                            }else{
                                $query->whereNull('verified_at');
                            }
                        }
                    }),
                    AllowedFilter::callback('year', function (Builder $query, $value) {
                        if(!empty($value)){
                            $query->whereYear('created_at', $value);
                        }
                    }),
                ]);
    }

    public function getExcelQuery(): QueryBuilder
	{
		return $this->query();
	}

    public function toggleStatus(User $user): User
    {
        $this->update(['is_blocked'=>!$user->is_blocked], $user);
        $user->refresh();
        return $user;
    }

    public function excel(): SimpleExcelWriter
    {
        set_time_limit(0); // Removes the time limit

        $page = 1;
        $perPage = 1000; // Number of items per page
        $writer = SimpleExcelWriter::streamDownload('students.xlsx');

        do {
            // Set the current page for pagination
            Paginator::currentPageResolver(function () use ($page) {
                return $page;
            });

            // Retrieve the paginated data
            $paginator = $this->paginate($perPage);
            $items = $paginator->items();

            // Write each item to the Excel file
            foreach ($items as $data) {
                $writer->addRow([
                    'Id' => $data->id,
                    'Name' => $data->name,
                    'Email' => $data->email,
                    'Phone' => $data->phone,
                    'Role' => $data->current_role,
                    'Blocked' => $data->is_blocked ? 'Yes' : 'No',
                    'Created At' => $data->created_at->format('Y-m-d H:i:s'),
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
        $query->where(function($q) use($value){
            $q->where('name', 'LIKE', '%' . $value . '%')
            ->orWhere('email', 'LIKE', '%' . $value . '%')
            ->orWhere('phone', 'LIKE', '%' . $value . '%');
        });
    }
}
