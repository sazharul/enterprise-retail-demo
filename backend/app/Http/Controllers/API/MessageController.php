<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Message;
use App\Models\MessageDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MessageController extends BaseController
{
    public function get_message(Request $request)
    {
        $perPage = $request->input('perPage') ?? 15;
        $user = Auth::user();
        if (Message::where('user_id', $user->id)->exists()) {
            $message = Message::where('user_id', $user->id)->first();
            $message->is_user_read = 1;
            $message->update();

            $messages = Message::with(['user', 'message_details' => function ($query) {
                $query->orderBy('created_at', 'asc');
            }])->where('user_id', $user->id)->first();

            if ($messages) {
                // Paginate the message_details
                $messageDetailsPaginated = $messages->message_details()->paginate($perPage);
                // Replace the original message_details collection with the paginated one
                $messages->setRelation('message_details', $messageDetailsPaginated);
            }

        } else {
            $message = new Message();
            $message->user_id = $user->id;
            $message->save();

            $messages = Message::with(['user', 'message_details' => function ($query) {
                $query->orderBy('created_at', 'asc');
            }])->where('user_id', $user->id)->first();

            if ($messages) {
                // Paginate the message_details
                $messageDetailsPaginated = $messages->message_details()->paginate($perPage);
                // Replace the original message_details collection with the paginated one
                $messages->setRelation('message_details', $messageDetailsPaginated);
            }
        }
        return $this->sendResponse($messages, 'Messages retrieved successfully');
    }

    public function read_message()
    {
        $user = Auth::user();
        if (Message::where('user_id', $user->id)->exists()) {
            $message = Message::where('user_id', $user->id)->first();
            $message->is_user_read = 1;
            $message->update();

        } else {
            return $this->sendError('No User Found',404);
        }
        return $this->sendResponse($message, 'Messages read successfully');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => ['nullable', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = Auth::user();
        $requestData = $request->all();
        $file = $request->image;
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/Messages', $fileName);
            $path = '/images/Messages/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        // dd($request->receiver_id);
        if (Message::where('user_id', $user->id)->exists()) {
            $message = Message::where('user_id', $user->id)->first();
            $message->is_user_read = 1;
            $message->is_admin_read = 0;
            $message->update();
            $message_id =  $message->id;
        } else {
            $message = new Message();
            $message->user_id = $user->id;
            $message->is_user_read = 1;
            $message->save();

            $message_id = Message::where('user_id', $user->id)->first()->id;
        }

        $requestData['message_id'] = $message_id;
        $requestData['sender_id'] = $user->id;
        $requestData['receiver_id'] = 0;
        $message = MessageDetails::create($requestData);

        return $this->sendResponse($message, 'Message Sent Successfully');
    }
}
