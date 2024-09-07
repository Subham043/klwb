<?php

namespace App\Http\Traits;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Builder;

trait RoleTrait
{
    public function currentRole(): Attribute
    {
        $roles_array = $this->getRoleNames();
        $currentRole = count($roles_array) > 0 ? $roles_array[0] : null;
        return Attribute::make(
            get: fn () => $currentRole,
        );
    }

    public function scopeHasRoles(Builder $query, array $roles): Builder
    {
        return $query->with('roles')
        ->whereHas('roles', function($q) use($roles){
            $q->whereIn('name', $roles);
        });
    }

    public function scopeDoesNotHaveRoles(Builder $query, array $roles): Builder
    {
        return $query->with('roles')
        ->whereHas('roles', function($q) use($roles){
            $q->whereNotIn('name', $roles);
        });
    }
}
