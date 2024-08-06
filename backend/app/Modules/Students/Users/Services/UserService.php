<?php

namespace App\Modules\Students\Users\Services;

use App\Modules\Students\Users\Models\User;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\QueryBuilder\AllowedFilter;

class UserService
{

    public function all(): Collection
    {
        return User::lazy(100)->collect();
    }

    public function paginate(Int $total = 10): LengthAwarePaginator
    {
        $query = User::with('roles')->latest();
        return QueryBuilder::for($query)
                ->allowedFilters([
                    AllowedFilter::custom('search', new CommonFilter, null, false),
                ])
                ->paginate($total)
                ->appends(request()->query());
    }

    public function getById(Int $id): User|null
    {
        return User::with('roles')->findOrFail($id);
    }

    public function getByEmail(String $email): User
    {
        return User::where('email', $email)->firstOrFail();
    }

    public function getByPhone(String $phone): User
    {
        return User::where('phone', $phone)->firstOrFail();
    }

    public function create(array $data): User
    {
        $user = User::create([...$data, 'otp' => rand (1111, 9999)]);
        return $user;
    }

    public function update(array $data, User $user): User
    {
        $user->update($data);
        return $user;
    }

    public function syncRoles(array $roles = [], User $user): void
    {
        $user->syncRoles($roles);
    }

    public function delete(User $user): bool|null
    {
        return $user->delete();
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
