<?php
namespace App\Http\Interfaces;

use Illuminate\Database\Eloquent\Builder;

interface AuthTraitInterface
{
	public function scopeWhenNotAdmin(Builder $query): Builder;
}