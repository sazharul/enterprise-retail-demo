<?php

namespace App\Http\Controllers\API;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ContactController extends BaseController {

    public function store(Request $request) {

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email'      => 'required|email',
            'message'     => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        
        $contact = new Contact();
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->number = $request->number;
        $contact->message = $request->message;
        $contact->save();

        return $this->sendResponse($contact, 'Your message has been sent successfully.');
    }
}
