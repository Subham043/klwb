<?php

namespace App\Http\Services;

use App\Modules\IndustryManagement\Payment\Enums\PaymentStatus;
use App\Modules\IndustryManagement\Payment\Models\Payment;
use App\Modules\Students\Scholarship\Models\Application;
use Illuminate\Support\Collection;

class ScholarshipHelperService
{

	public function industryPaymentWrapper(Application|null $application): Application|null
	{
		$newApp = clone $application;
		if (!$newApp) return $newApp;
		$payments_container = [];
		$payments = $this->getIndustryCompletedPayments([$newApp->company_id], ($newApp->application_year-1));
		foreach ($payments as $payment) {
			array_push($payments_container, $payment);
		}
		$newApp->industryPaymentInfo = collect($payments_container)->where('comp_regd_id', $newApp->company_id)->where('year', ($newApp->application_year-1))->first() ?? null;
		return $newApp;
	}

	public function getIndustryCompletedPayments($comp_regd_id, $year): Collection
	{
		return Payment::whereIn('comp_regd_id', array_unique($comp_regd_id))->where('status', PaymentStatus::Success->value)->where('payments.year', '=', $year)->orderBy('year', 'desc')->get();
	}
}
