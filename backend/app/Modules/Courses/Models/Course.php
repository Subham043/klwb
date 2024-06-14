<?php

namespace App\Modules\Courses\Models;

use App\Modules\Classes\Models\Classes;
use App\Modules\Graduations\Models\Graduation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

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