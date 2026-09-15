<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'             => 'required',
            'email'            => 'email|required|unique:admins,email,' . $this->id,
            'password'         => 'required|confirmed',
            'phone'           => 'required|unique:admins,phone,' . $this->id,
            'avatar'           => 'nullable|image|mimes:jpeg,png,jpg',
            'role_id'          => 'sometimes|required',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'national_id.required' => 'The National ID Card field is required.',
            'role_id.required'     => 'The Role field is required.',
        ];
    }
}
