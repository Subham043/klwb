<?php

namespace App\Modules\Students\Scholarship\Models;

use App\Modules\Students\Scholarship\Enums\AccountType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Storage;

class ApplicationAccount extends Model
{
    use HasFactory;

    protected $table = 'application_accounts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
					'application_id',
					'name',
					'branch',
					'ifsc',
					'acc_no',
					'passbook',
					'holder',
					'type',
    ];

    protected $attributes = [];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

				public $passbook_path = 'student-passbook';

				protected $appends = ['passbook_link', 'account_type'];

				protected function accountType(): Attribute
				{
					return new Attribute(
						get: fn() => AccountType::getValue($this->type),
					);
				}
			
				protected function passbook(): Attribute
				{
					return Attribute::make(
						set: fn(string $value) => $this->passbook_path . '/' . $value,
					);
				}
			
				protected function passbookLink(): Attribute
				{
					return new Attribute(
						get: fn() => ($this->passbook && Storage::exists($this->passbook)) ? Storage::temporaryUrl($this->passbook, now()->addMinutes(20)) : null,
					);
				}

    public function application()
				{
					return $this->belongsTo(Application::class, 'application_id')->withDefault();
				}

}
