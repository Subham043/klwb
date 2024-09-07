<?php

namespace App\Modules\CourseManagement\Courses\Models;

use App\Http\Interfaces\AuthTraitInterface;
use App\Http\Traits\AuthTrait;
use App\Modules\CourseManagement\Classes\Models\Classes;
use App\Modules\CourseManagement\Graduations\Models\Graduation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model implements AuthTraitInterface
{
    use HasFactory, AuthTrait;

    protected $table = 'courses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'graduation_id',
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

    public function graduation()
    {
        return $this->belongsTo(Graduation::class, 'graduation_id')->withDefault();
    }

    public function classes()
    {
        return $this->hasMany(Classes::class, 'course_id');
    }

}
