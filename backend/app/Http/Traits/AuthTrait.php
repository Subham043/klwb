<?php

namespace App\Http\Traits;

use Illuminate\Database\Eloquent\Builder;

trait AuthTrait
{
    public function scopeIsActive(Builder $query): Builder
    {
        if(request()->user() && request()->user()->hasRole('Super-Admin|Admin')) {
            return $query;
        }
        return $query->where('is_active', true);
    }
    public function scopeIsNotBlocked(Builder $query): Builder
    {
        if(request()->user() && request()->user()->hasRole('Super-Admin|Admin')) {
            return $query;
        }
        return $query->where('is_blocked', false);
    }
    
    public function scopeApplicationIsActive(Builder $query): Builder
    {
        if(request()->user() && request()->user()->hasRole('Super-Admin|Admin')) {
            return $query;
        }
        return $query->where('inactive', false);
    }
}
