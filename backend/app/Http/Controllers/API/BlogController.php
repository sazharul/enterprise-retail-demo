<?php

namespace App\Http\Controllers\API;

use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController as BaseController;

class BlogController extends BaseController
{
    public function allPosts()
    {
        $blogs = Blog::where('status', '1')->get();
        return $this->sendResponse($blogs, 'Blog retrieved successfully.');
    }

    public function showPost($id)
    {
        $blog = Blog::where('status', 1)->find($id);
        if (isset($blog)) {

            $success['blog'] = $blog;
            $comments = $blog->comments;
            foreach ($comments as $comment) {
                $comment['user'] = $comment->user;
            }

            // dd($success);
            return $this->sendResponse($success, 'Blog retrieved successfully.');
        }

        return $this->sendError('Error.', ['error' => 'No Blog exist with this ID']);
    }

    public function addcomment(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'comment'   => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $blog = Blog::where('status', 1)->find($id);
        if (isset($blog)) {
            $requestData = $request->all();
            if (Auth::user()) {
                $requestData['user_id'] = Auth::user()->id;
            }
            $requestData['blog_id'] = $id;
            Comment::create($requestData);
            return $this->sendResponse('Comment', 'Comment Added successfully.');
        }

        return $this->sendError('Error.', ['error' => 'No Blog exist with this ID']);
    }
}
