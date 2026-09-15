<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\MessageDetails;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    //
    public function search(Request $request)
    {
        $query = $request->get('query');

        // Perform a search query based on the input query
        $users = User::where('name', 'like', '%' . $query . '%')->get();

        // Return the user name suggestions as JSON response
        return response()->json($users);
    }

    public function index()
    {

        // $users = User::select('id', 'name', 'avatar')->latest()->get();
        $tusers = Message::with('user')->latest()->get();
        return view('message.index', compact('tusers'));
    }

    public function profile($id)
    {

        $tusers = Message::with('user')->latest()->get();
        $user = User::where('id', $id)->select('id', 'name', 'avatar')->first();
        // dd($user);
        if (Message::where('user_id', $id)->exists()) {
            $message = Message::where('user_id', $user->id)->first();
            $message->is_admin_read = 1;
            $message->update();
        } else {
            $message = new Message();
            $message->user_id = $id;
            $message->save();

        }
        $messages = Message::with(['user', 'message_details' => function ($query) {
            $query->orderBy('created_at', 'asc');
        }])->where('user_id', $id)->first();
        // dd($messages);
        return view('message.profile', compact('tusers', 'messages', 'user'));
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'receiver_id' => 'required',
            'image' => ['nullable', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator);
        }
        // dd(request()->all());

        if (Message::where('user_id', $request->receiver_id)->exists()) {
            $message = Message::where('user_id', $request->receiver_id)->first();
            $message->is_user_read = 0;
            $message->is_admin_read = 1;
            $message->update();
            $message_id = $message->id;
        } else {
            $message = new Message();
            $message->user_id = $request->receiver_id;
            $message->is_admin_read = 1;
            $message->save();

            $message_id = Message::where('user_id', $request->receiver_id)->first()->id;
        }

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
        // dd($path);

        $requestData['image'] = $path;
        // dd($request->receiver_id);

        $requestData['message_id'] = $message_id;
        $requestData['sender_id'] = 0;
        $message = MessageDetails::create($requestData);

        return response()->json(['message' => $message]);
    }

    public function destroy($id)
    {
        $message = Message::find($id);
        $message->delete();

        return redirect()->back();
    }
}
