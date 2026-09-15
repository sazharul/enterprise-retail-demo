<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StaffRequest extends FormRequest
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
            'email'            => 'email|required|unique:admins',
            'password'         => 'required|confirmed',
            'phone'           => 'required|unique:admins',
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
            'role_id.required'     => 'The Role field is required.',
        ];
    }
}
