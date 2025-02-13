<?php

namespace App\Modules\IndustryManagement\Staff\Services;

use App\Http\Abstracts\AbstractAuthenticableExcelService;
use App\Http\Enums\Guards;
use App\Modules\IndustryManagement\IndustryAuth\Models\IndustryAuth;
use App\Modules\Roles\Enums\Roles;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\SimpleExcel\SimpleExcelWriter;

class IndustryEmployeeService extends AbstractAuthenticableExcelService
{

    public function model(): Builder
    {
        return IndustryAuth::with('roles')->whereHas('roles', function ($query) {
            $query->where('name', Roles::IndustryStaff->value());
        })
        ->where('created_by', auth()->guard(Guards::Industry->value())->user()->id)
        ->where('reg_industry_id', auth()->guard(Guards::Industry->value())->user()->reg_industry_id);
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ]);
    }

    public function getExcelQuery(): QueryBuilder
	{
		return $this->query();
	}

    public function toggleStatus(IndustryAuth $industry): IndustryAuth
    {
        $industry->update(['is_blocked'=>!$industry->is_blocked]);
        $industry->refresh();
        return $industry;
    }

    public function excel(): SimpleExcelWriter
    {
        set_time_limit(0); // Removes the time limit

        $page = 1;
        $perPage = 1000; // Number of items per page
        $writer = SimpleExcelWriter::streamDownload('staffs.xlsx');

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
