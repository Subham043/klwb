<?php
namespace App\Http\Interfaces;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\QueryBuilder;

interface AuthenticableServiceInterface
{
	public function model(): Builder;
	public function query(): QueryBuilder;
	public function all(): Collection;
	public function paginate(): LengthAwarePaginator;
	public function getById(Int $id): User;
	public function getByEmail(String $email): User;
	public function getByPhone(String $phone): User;
	public function create(array $data): User;
	public function update(array $data, $user): User;
	public function syncRoles(array $roles = [], $user): void;
	public function delete($user): bool;
}