<?php

namespace App\Http\Controllers\API;

use App\Helpers\Helper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController as BaseController;

class NotificationController extends BaseController
{
    //
    public function get_notification()
    {
        $notifications = Auth::user()->receivedNotifications;
        // dd($notifications);
        return $this->sendResponse($notifications, 'Notifications retrieved successfully.');
    }

    public function updateDeviceToken(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', ['error'=>'Validation Error'], 422);
        }

        Auth::user()->device_token =  $request->token;

        Auth::user()->save();
        return $this->sendResponse('', 'Token successfully stored.');

    }

    public function sendNotification(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'receiver_id' => 'required',
            'title' => 'required|string',
            'body' => 'required|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', ['error'=>'Validation Error'], 422);
        }
        // dd($request->all());
        Helper::send_notification([$request->receiver_id], $request->title, $request->body);
    }
}
