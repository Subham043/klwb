<?php

namespace App\Http\Traits;

use Illuminate\Database\Eloquent\Builder;

trait AuthTrait
{
    public function scopeWhenNotAdmin(Builder $query): Builder
    {
        if(request()->user() && request()->user()->hasRole('Super-Admin|Admin')) {
            return $query;
        }
        return $query->where('is_active', true);
    }
}
