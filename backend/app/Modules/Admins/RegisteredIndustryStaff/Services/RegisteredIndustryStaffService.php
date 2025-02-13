<?php

namespace App\Modules\Admins\RegisteredIndustryStaff\Services;

use App\Modules\IndustryManagement\IndustryAuth\Models\IndustryAuth;
use App\Modules\Roles\Enums\Roles;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class RegisteredIndustryStaffService
{
    protected function model(string $reg_industry_id, string $created_by): Builder
    {
        return IndustryAuth::with([
            'roles' => function ($query) {
                $query->where('name', Roles::IndustryStaff->value());
            }
        ])
        ->where('reg_industry_id', $reg_industry_id)
        ->where('created_by', $created_by)
        ->whereHas('roles', function ($query) {
            $query->where('name', Roles::IndustryStaff->value());
        })
        ->whereNotNull('created_by');
    }
    protected function query(string $reg_industry_id, string $created_by): QueryBuilder
    {
        return QueryBuilder::for($this->model($reg_industry_id, $created_by))
                ->defaultSort('-id')
                ->allowedSorts('id')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ]);
    }

    public function getExcelQuery(string $reg_industry_id, string $created_by): QueryBuilder
	{
		return $this->query($reg_industry_id, $created_by);
	}

    public function all(string $reg_industry_id, string $created_by): Collection
    {
        return $this->query($reg_industry_id, $created_by)
                ->lazy(100)->collect();
    }

    public function paginate(string $reg_industry_id, string $created_by, Int $total = 10): LengthAwarePaginator
    {
        return $this->query($reg_industry_id, $created_by)
                ->paginate($total)
                ->appends(request()->query());
    }

    public function get(string $reg_industry_id, string $created_by, string $id): IndustryAuth
    {
        return $this->query($reg_industry_id, $created_by)->where('id', $id)->firstOrFail();
    }

    public function update(array $data, IndustryAuth $industry): IndustryAuth
    {
        $industry->update($data);
        $industry->refresh();
        return $industry;
    }

    public function toggleStatus(IndustryAuth $industry): IndustryAuth
    {
        $industry->update(['is_blocked'=>!$industry->is_blocked]);
        $industry->refresh();
        return $industry;
    }

    public function excel(string $reg_industry_id, string $created_by): SimpleExcelWriter
    {
        set_time_limit(0); // Removes the time limit

        $page = 1;
        $perPage = 1000; // Number of items per page
        $writer = SimpleExcelWriter::streamDownload('industry_staffs.xlsx');

        do {
            // Set the current page for pagination
            Paginator::currentPageResolver(function () use ($page) {
                return $page;
            });

            // Retrieve the paginated data
            $paginator = $this->paginate($reg_industry_id, $created_by, $perPage);
            $items = $paginator->items();

            // Write each item to the Excel file
            foreach ($items as $data) {
                $writer->addRow([
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

