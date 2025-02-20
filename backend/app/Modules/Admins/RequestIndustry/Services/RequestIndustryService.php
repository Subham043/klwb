<?php

namespace App\Modules\Admins\RequestIndustry\Services;

use App\Http\Abstracts\AbstractExcelService;
use App\Http\Services\FileService;
use App\Modules\Admins\RequestIndustry\Models\RequestIndustry;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class RequestIndustryService extends AbstractExcelService
{
    public function model(): Builder
    {
        return RequestIndustry::with([
            'taluq',
            'city',
        ])->where('status', '!=', 1);
    }
    public function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
                ->defaultSort('-id')
                ->allowedSorts('id', 'name')
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                    AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
                        $query->where('taluq_id', $value);
                    }),
                    AllowedFilter::callback('has_city', function (Builder $query, $value) {
                        $query->where('city_id', $value);
                    }),
                    AllowedFilter::callback('status', function (Builder $query, $value) {
                        // if ($value == 'approved') {
                        //     $query->where('status', 1);
                        // }
                        if ($value == 'rejected') {
                            $query->where('status', 2);
                        }
                        if ($value == 'pending') {
                            $query->where('status', 0);
                        }
                    }),
                ]);
    }

    public function getExcelQuery(): QueryBuilder
	{
		return $this->query();
	}

    public function saveRegisterDoc(RequestIndustry $requestIndustry): RequestIndustry
    {
        $register_doc = (new FileService)->save_file('register_doc', (new RequestIndustry)->register_doc_path);
        return $this->update([
            'register_doc' => $register_doc,
        ], $requestIndustry);
    }

    public function getPendingById(Int $id): RequestIndustry
    {
        return $this->model()->where('status', 0)->findOrFail($id);
    }

    public function excel(): SimpleExcelWriter
    {
        set_time_limit(0); // Removes the time limit

        $page = 1;
        $perPage = 1000; // Number of items per page
        $writer = SimpleExcelWriter::streamDownload('request_industries.xlsx');

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
                    'Company' => $data->company,
                    'Email' => $data->email,
                    'Phone' => $data->mobile,
                    'GST' => $data->gst_no,
                    'PAN' => $data->pan_no,
                    'Act' => $data->act,
                    'Category' => $data->category,
                    'Address' => $data->address,
                    'Taluq' => $data->taluq->name,
                    'Taluq ID' => $data->taluq->id,
                    'District' => $data->city->name,
                    'District ID' => $data->city->id,
                    'Active' => $data->is_active ? 'Yes' : 'No',
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
            $q->where('company', 'LIKE', '%' . $value . '%')
            ->orWhere('email', 'LIKE', '%' . $value . '%')
            ->orWhere('gst_no', 'LIKE', '%' . $value . '%')
            ->orWhere('pan_no', 'LIKE', '%' . $value . '%')
            ->orWhere('act', 'LIKE', '%' . $value . '%')
            ->orWhere('category', 'LIKE', '%' . $value . '%')
            ->orWhere('address', 'LIKE', '%' . $value . '%')
            ->orWhere('mobile', 'LIKE', '%' . $value . '%')
            ->orWhereHas('taluq', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%');
            })
            ->orWhereHas('city', function($q) use($value){
                $q->where('name', 'LIKE', '%' . $value . '%');
            });
        });
    }
}
