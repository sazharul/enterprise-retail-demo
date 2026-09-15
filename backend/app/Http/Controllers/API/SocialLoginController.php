<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SocialLoginController extends BaseController {

    public function facebookLogin(Request $request) {

        $validator = Validator::make($request->all(), [
            'fb_id'     => 'required',
            'name'      => 'required',
            'email'     => 'required|email',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $findUser = User::where('fb_id', $request->fb_id)->first();

        if ($findUser) {
            Auth::login($findUser);
        } else {
            $newUser         = User::updateOrCreate(
                [
                    'email' => $request->email,
                ],
                [
                    'fb_id'         => $request->fb_id,
                    'name'          => $request->name,
                    'avatar'          => $request->avatar,
                    'password'      => Hash::make('12345678')
                ]
            );

            Auth::login($newUser);
        }

        $auth = Auth::user();
        if (isset($auth)) {
            $success['token'] = $auth->createToken('token-name')->plainTextToken;
            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.');
        }

    }

    public function googleLogin(Request $request) {

        $validator = Validator::make($request->all(), [
            'google_id' => 'required',
            'name'      => 'required',
            'email'     => 'required|email',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }


        $findUser = User::where('google_id', $request->google_id)->first();


        if (isset($findUser)) {

            Auth::login($findUser);

        } else {
            $newUser         = User::updateOrCreate(
                [
                    'email'         => $request->email,
                ],
                [
                    'google_id'     => $request->google_id,
                    'name'          => $request->name,
                    'avatar'        => $request->avatar,
                    'password'      => $request->password ?? Hash::make('12345678'),
                ]
            );

            Auth::login($newUser);
        }

        $auth = Auth::user();
        if (isset($auth)) {

            $success['token'] = $auth->createToken('token-name')->plainTextToken;
            return $this->sendResponse($success, 'User login successfully.');

        } else {
            return $this->sendError('Unauthorised.');
        }
    }
}
