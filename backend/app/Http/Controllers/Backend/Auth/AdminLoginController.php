<?php

namespace App\Http\Controllers\Backend\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminLoginController extends Controller
{
    public function showLoginForm()
    {
        // Check if an admin is already authenticated
        if (Auth::guard('admin')->check()) {
            return redirect(route('admin.dashboard'));
        }

        return view('admin.auth.login');
    }

    /**
     *
     * @param Request $request
     * @return type
     */
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        if (Auth::guard('admin')->attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->back()->withInput($request->only('email', 'remember'))
            ->withErrors(['password' => [
                'These credentials don\'t match our records.',
                'Or Incorrect Password'
            ]]);
    }

    /**
     *
     * @return type
     */
    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect()->route('admin.login_form');
    }
}
