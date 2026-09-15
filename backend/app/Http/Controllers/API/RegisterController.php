<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Sanctum\Sanctum;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use PHPUnit\TextUI\Configuration\Php;
use Laravel\Socialite\Facades\Socialite;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController as BaseController;
use Laravel\Sanctum\PersonalAccessToken as SanctumToken;



class RegisterController extends BaseController
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */

    //  public function Logout(Request $request)
    //  {
    //      $auth_user = Auth::user();
    //      $token = $request->bearerToken();
    //      if (!isset($token)) {
    //          $token = $request->token;
    //      }
    //      if (isset($token)) {
    //          $model = Sanctum::$personalAccessTokenModel;
    //          $accessToken = $model::findToken($token);

    //          if (isset($accessToken)) {
    //              $accessToken->delete();
    //              Auth::logout();
    //              return $this->sendResponse($auth_user->name, 'Successfully Logout.');


    //          } else {
    //              if (isset($auth_user)) {
    //                  Auth::logout();
    //              }
    //          }
    //      }
    //      return $this->sendResponse("success", 'User Successfully Logout.');
    //  }

    public function logout(Request $request)
    {
        $token = $request->bearerToken() ?: $request->token;

        if (!isset($token)) {
            return $this->sendResponse("error", 'Token not provided.');
        }

        $accessToken = SanctumToken::findToken($token);

        if (isset($accessToken)) {
            $accessToken->delete();
            return $this->sendResponse(Auth::user()->name, 'Successfully logged out.');
        } else {
            return $this->sendResponse("success", 'User not logged in.');
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'f_name' => ' required',
            'phone' => ' required|digits:11|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'c_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $requestdata = $request->all();
        $input['name'] = $requestdata['f_name'] ." ". $requestdata['l_name'];
        $input['phone'] = $requestdata['phone'];
        $input['email'] = $requestdata['email'];
        $input['password'] = bcrypt($requestdata['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['name'] =  $user->name;

        return $this->sendResponse($success, 'User register successfully.');
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users',
            'password' => 'required|min:8',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['phone'] =  $user->phone;

            return $this->sendResponse($success, 'User login successfully.');
        }
        else{
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised'], 401);
        }
    }

    public function otp_login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'phone' => ' required|digits:11',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $otp = env('DEMO_MODE', false) ? 123456 : 12345;
        $user = User::where('phone', $request->phone)->first();
        if (isset($user)) {
            $success['phone'] = $user->phone;
            $success['otp'] = $otp;
            User::where('id', $user->id)->update([
                'otp' => $otp
            ]);

            return $this->sendResponse($success, 'Use OTP to Login.');
        }


        return $this->sendError('Phone Deos\'nt Exist');
    }


    public function verify_otp(Request $request)
    {
        $user = User::where('phone', $request->phone)->first();
        if (isset($user)) {
            $otp_check = User::where('phone', $request->phone)->where('otp', $request->otp)->first();

            if (!isset($otp_check)) {
                return $this->sendError('Unmatched.', ['error' => 'OTP did not match']);
            }

            $success['phone'] = $user->phone;
            $success['token'] = $user->createToken('MyApp')->plainTextToken;

            return $this->sendResponse($success, 'Otp verify successfully.');
        } else {
            return $this->sendError('Unmatched.', ['error' => 'User Not Found']);
        }
    }
    public function forgot_password(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ' required|email',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $otp = env('DEMO_MODE', false) ? 123456 : 12345;
        $user = User::where('email', $request->email)->first();
        if (isset($user)) {
            $success['email'] = $user->email;
            $success['otp'] = $otp;
            User::where('id', $user->id)->update([
                'otp' => $otp
            ]);

            return $this->sendResponse($success, 'Use OTP to Change Password.');
        } else {
            return $this->sendError('Error.', ['error' => 'User Not Found']);
        }
    }

    public function verify_email(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ' required|email',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = User::where('email', $request->email)->first();
        if (isset($user)) {
            $otp_check = User::where('email', $request->email)->where('otp', $request->otp)->first();

            if (!isset($otp_check)) {
                return $this->sendError('Unmatched.', ['error' => 'OTP did not match']);
            }

            $success['email'] = $user->email;
            $success['token'] = $user->createToken('MyApp')->plainTextToken;

            return $this->sendResponse($success, 'Otp verify successfully.');
        } else {
            return $this->sendError('Unmatched.', ['error' => 'User Not Found']);
        }
    }

    /**
     * Change Password api
     *
     * @return \Illuminate\Http\Response
     */

    public function change_password(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'new_password' => 'required|min:8',
            'c_password' => 'required|same:new_password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = User::where('email', $request->email)->first();
        if (isset($user)) {
            $success['email'] = $user->email;
            $user->update([
                'password' => bcrypt($request->new_password)
            ]);

            return $this->sendResponse($success, 'Password Changed Successfully!.');
        }
        else{
            return $this->sendError('Unauthorised.', ['error'=>'user not found']);
        }
    }

}
