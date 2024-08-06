<?php

namespace App\Modules\CourseManagement\Graduations\Models;

use App\Modules\CourseManagement\Courses\Models\Course;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Graduation extends Model
{
    use HasFactory;

    protected $table = 'graduations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'is_active',
    ];

    protected $attributes = [
        'is_active' => true,
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function scopeCheckAuth(Builder $query): Builder
    {
        if(auth()->check() && request()->user()->hasRole('Verification-Officer|Financial-Officer|Payment-Officer|Industry|Institute|Student')) {
            return $query->where('is_active', true);
        }
        return $query;
    }

    public function courses()
    {
        return $this->hasMany(Course::class, 'graduation_id');
    }

}