<?php

namespace App\Modules\Admins\Fees\Requests;

use App\Modules\Admins\Fees\Services\FeeService;
use Illuminate\Validation\Rule;

class FeeUpdateRequest extends FeeCreateRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $request = $this;
        $fee = (new FeeService)->getById($this->route('id'));
        return [
            'amount' => 'required|numeric|gt:0',
            'graduation_id' => ['required','numeric','exists:graduations,id', Rule::unique('fees')->where(function ($query) use ($request, $fee) {
                return $query
                ->where(function ($qry) use($fee) {
                    return $qry->where('year', $fee->year)->orWhere('year', date('Y'));
                })
                ->where('graduation_id', $request->graduation_id)
                ->where('id', '<>', $request->route('id'));
             })],
        ];
    }

}
