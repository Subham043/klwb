<?php

namespace App\Http\Traits;

use App\Http\Enums\Guards;
use Illuminate\Database\Eloquent\Builder;

trait AuthTrait
{
    public function scopeWhenNotAdmin(Builder $query): Builder
    {
        if(auth()->guard(Guards::Admin->value())->check() && request()->user()->hasRole('Super-Admin|Admin')) {
            return $query;
        }
        return $query->where('is_active', true);
    }
}
