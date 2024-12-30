<?php
namespace App\Http\Interfaces;

use Illuminate\Database\Eloquent\Builder;

interface AuthTraitInterface
{
	public function scopeIsActive(Builder $query): Builder;
	public function scopeApplicationIsActive(Builder $query): Builder;
}