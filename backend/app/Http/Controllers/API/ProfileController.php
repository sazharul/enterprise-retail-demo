<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\RewardHistory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends BaseController
{
    public function profile_info(Request $request)
    {
        $perPage = (int)$request->pagination ?? 15;
        $user = User::with(['reward', 'orders.orderDetails'])->find(Auth::id());

        $response = [
            'name'          => $user->name,
            'email'         => $user->email,
            'phone'         => $user->phone,
            'avatar'        => $user->avatar,
            'reward_points' => $user->reward->remaining_point ?? 0,
            'orders'        => $user->orders()->with('orderDetails')->paginate($perPage),
        ];
        return $this->sendResponse($response, 'Profile retrieved successfully..');
    }

    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'avatar' => 'image|max:2048|nullable',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = Auth::user();
        $users = User::findOrFail($user->id);
        $requestData = $request->all();
        $file = $request->avatar;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/Users', $fileName);
            $path = '/images/Users/' . $fileName;
        } else {
            $path = $users->avatar;
        }
        $requestData['avatar'] = $path;

        $users->update($requestData);

        $success['name'] = $users->name;

        if ($users->wasChanged()) {

            return $this->sendResponse($success, 'User updated successfully..');
        } else {

            return $this->sendResponse($success, 'No changes made..');
        }

    }
    public function edit_pass(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required|min:8',
            'c_password' => 'required|same:new_password',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = Auth::user();
        if (!Hash::check($request->old_password, $user->password)) {
            return $this->sendError('Error.', ['error' => 'Old password did not match']);
        }

        $success['phone'] = $user->phone;
        $success['name'] = $user->name;
        $success['email'] = $user->email;

        $user->update([
            'password' => bcrypt($request->new_password),
        ]);
        return $this->sendResponse($success, 'Password Changed Successfully!.');
    }

    public function rewardHistory(Request $request){
        $perPage = (int)$request->pagination ?? 15;
        $response = RewardHistory::with(['order:id,order_no'])->where('user_id', Auth::id())->paginate($perPage);
        return $this->sendResponse($response, 'Reward History retrieved successfully..');
    }
}