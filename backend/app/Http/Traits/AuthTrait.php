<?php

namespace App\Http\Traits;

use Illuminate\Database\Eloquent\Builder;

trait AuthTrait
{
    public function scopeWhenNotAdmin(Builder $query): Builder
    {
        if(auth()->check() && request()->user()->hasRole('Verification-Officer|Financial-Officer|Payment-Officer|Industry|Industry-Staff|Institute|Institute-Staff|Student')) {
            return $query->where('is_active', true);
        }
        return $query;
    }
}
