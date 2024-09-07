<?php
namespace App\Http\Interfaces;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Builder;

interface RoleTraitInterface
{
	public function currentRole(): Attribute;
	public function scopeHasRoles(Builder $query, array $roles): Builder;
	public function scopeDoesNotHaveRoles(Builder $query, array $roles): Builder;
}