<?php

namespace App\Modules\Admins\RegisteredIndustry\Services;

use App\Modules\IndustryManagement\IndustryAuth\Models\IndustryAuth;
use App\Modules\Admins\RegisteredIndustry\Requests\RegisteredIndustryUpdateRequest;
use App\Modules\Admins\RequestIndustry\Enums\Act;
use App\Modules\LocationManagement\Cities\Services\CityService;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\SimpleExcel\SimpleExcelWriter;

class RegisteredIndustryService
{
    protected function model(): Builder
    {
        return IndustryAuth::with([
            'industry',
            'taluq',
            'city',
        ])
            ->whereHas('industry')
            ->whereNull('created_by');
    }
    protected function query(): QueryBuilder
    {
        return QueryBuilder::for($this->model())
            ->defaultSort('-id')
            ->allowedSorts('id', 'principal')
            ->allowedFilters([
                AllowedFilter::custom('search', new CommonFilter, null, false),
                AllowedFilter::callback('has_state', function (Builder $query, $value) {
                    $query->where(function ($query) use ($value) {
                        $query->whereHas('city', function ($qry) use ($value) {
                            $qry->where('state_id', $value);
                        });
                    });
                }),
                AllowedFilter::callback('has_city', function (Builder $query, $value) {
                    $query->where(function ($query) use ($value) {
                        $query->where('city_id', $value);
                    });
                }),
                AllowedFilter::callback('has_taluq', function (Builder $query, $value) {
                    $query->where(function ($query) use ($value) {
                        $query->where('taluq_id', $value);
                    });
                }),
                AllowedFilter::callback('active_status', function (Builder $query, $value) {
                    $query->where(function ($query) use ($value) {
                        if (!empty($value)) {
                            if (strtolower($value) == "blocked") {
                                $query->where('is_blocked', true);
                            } else {
                                $query->where('is_blocked', false);
                            }
                        }
                    });
                }),
                AllowedFilter::callback('verification_status', function (Builder $query, $value) {
                    $query->where(function ($query) use ($value) {
                        if (!empty($value)) {
                            if (strtolower($value) == "verified") {
                                $query->whereNotNull('verified_at');
                            } else {
                                $query->whereNull('verified_at');
                            }
                        }
                    });
                }),
            ]);
    }

    public function getExcelQuery(): QueryBuilder
    {
        return $this->query();
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

    public function getById(Int $id): IndustryAuth|null
    {
        return $this->model()->findOrFail($id);
    }

    public function update(RegisteredIndustryUpdateRequest $request, IndustryAuth $industry): IndustryAuth
    {
        $industry->update([
            'address' => $request->address,
            'taluq_id' => $request->taluq_id,
            'city_id' => $request->city_id,
        ]);
        $city = (new CityService)->getById($request->city_id);
        $industry->industry->update([
            'name' => $request->name,
            'act' => $request->act ? $request->act : null,
            'category' => $request->category ? $request->category : null,
            'state_id' => $city->state->id,
            'taluq_id' => $request->taluq_id,
            'city_id' => $request->city_id,
        ]);
        $industry->refresh();
        return $industry;
    }

    public function updateAuth(array $data, IndustryAuth $industry): IndustryAuth
    {
        $industry->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
        ]);
        $industry->refresh();
        return $industry;
    }

    public function updateAuthPassword(array $data, IndustryAuth $industry)
    {
        $industry->update([
            'password' => $data['password'],
        ]);
    }

    public function toggleStatus(IndustryAuth $industry): IndustryAuth
    {
        $status = true;
        if ($industry->is_blocked) {
            $status = false;
        }
        $industry->update(['is_blocked' => $status]);
        $industry->industry->update([
            'is_active' => !$status,
        ]);
        $industry->refresh();
        return $industry;
    }

    public function excel(): SimpleExcelWriter
    {
        ini_set('memory_limit', '256M');

        set_time_limit(0); // Removes the time limit

        $page = 1;
        $perPage = 1000; // Number of items per page
        $writer = SimpleExcelWriter::streamDownload('registered_industry.xlsx');

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
                    'Name' => $data->industry->name,
                    'Director Name' => $data->name,
                    'Mobile' => $data->phone,
                    'Email' => $data->email,
                    'Act' => Act::getValue($data->industry->act) ?? '',
                    'Category' => $data->industry->category ?? '',
                    'Taluq' => $data->taluq->name,
                    'Taluq ID' => $data->taluq->id,
                    'District' => $data->city->name,
                    'District ID' => $data->city->id,
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
        $query->where(function ($q) use ($value) {
            $q->where(function ($q) use ($value) {
                $valueAmp = str_replace('&', '&amp;', $value);
                $q->where('name', 'LIKE', '%' . $value . '%')
                    ->orWhere('name', 'LIKE', '%' . $valueAmp . '%');
            })
                ->orWhere('phone', 'LIKE', '%' . $value . '%')
                ->orWhere('email', 'LIKE', '%' . $value . '%')
                ->orWhere('gst_no', 'LIKE', '%' . $value . '%')
                ->orWhere('pan_no', 'LIKE', '%' . $value . '%')
                ->orWhere('address', 'LIKE', '%' . $value . '%')
                ->orWhere('reg_industry_id', 'LIKE', '%' . $value . '%')
                ->orWhereHas('industry', function ($qry) use ($value) {
                    $qry->where('name', 'LIKE', '%' . $value . '%')
                        ->orWhere('reg_id', 'LIKE', '%' . $value . '%')
                        ->orWhere('pincode', 'LIKE', '%' . $value . '%')
                        ->orWhere('act', 'LIKE', '%' . $value . '%')
                        ->orWhere('category', 'LIKE', '%' . $value . '%');
                })
                ->orWhereHas('city', function ($qry) use ($value) {
                    $qry->where('name', 'LIKE', '%' . $value . '%');
                })
                ->orWhereHas('taluq', function ($qry) use ($value) {
                    $qry->where('name', 'LIKE', '%' . $value . '%');
                });
        });
    }
}
