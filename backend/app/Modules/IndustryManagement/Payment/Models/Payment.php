<?php

namespace App\Modules\IndustryManagement\Payment\Models;

use App\Modules\Admins\Industries\Models\Industry;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Payment extends Model
{
    use HasFactory, LogsActivity;

    protected $table = 'payments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'comp_regd_id',
        'year',
        'pay_id',
        'price',
        'male',
        'female',
        'interest',
        'status',
        'resolved',
        'transaction_status',
        'atrn',
        'interest_paid',
        'employee_excel',
        'payed_on',
        'is_edited',
    ];

    protected $attributes = [
        'comp_regd_id' => null,
        'status' => 0,
        'resolved' => 0,
        'interest_paid' => 0,
        'employee_excel' => true,
        'year' => null,
        'pay_id' => null,
        'male' => null,
        'female' => null,
        'interest' => null,
        'transaction_status' => null,
        'atrn' => null,
        'is_edited' => false,
    ];

    protected $casts = [
        'year' => 'int',
        'price' => 'float',
        'male' => 'int',
        'female' => 'int',
        'interest' => 'float',
        'status' => 'int',
        'resolved' => 'int',
        'is_edited' => 'boolean',
        'payed_on' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $recordEvents = ['updated', 'deleted'];
    
    public $employee_excel_path = 'regfile';

    protected $appends = ['employee_excel_link'];

    protected function employeeExcel(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => $this->employee_excel_path.'/'.$value,
        );
    }

    protected function employeeExcelLink(): Attribute
    {
        return new Attribute(
            get: fn () => ($this->employee_excel && Storage::exists($this->employee_excel)) ? Storage::temporaryUrl($this->employee_excel, now()->addMinutes(20)) : null,
        );
    }

    public function industry()
    {
        return $this->belongsTo(Industry::class, 'comp_regd_id')->withDefault();
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('payment_'.$this->id)
        ->setDescriptionForEvent(
                function(string $eventName){
                    return "Payment with id ".$this->id." was {$eventName} by ".request()->user() ? request()->user()->current_role : "Super-Admin";
                }
            )
        ->logOnly([
            'price',
            'male',
            'female',
            'interest',
        ])
        ->logOnlyDirty()
        ->dontSubmitEmptyLogs();
        // Chain fluent methods for configuration options
    }

}
