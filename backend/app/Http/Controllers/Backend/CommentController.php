<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $comment = Comment::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $comment = Comment::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('comment.index', compact('comment'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('comment.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'blog_id' => 'required|exists:blogs,id',
            'user_id' => 'nullable|exists:users,id',
            'comment'   => 'required',
            'status'   => 'required',
        ]);


        $requestData = $request->all();

        Comment::create($requestData);

        return redirect()->route('comment.index')->with('flash_message', 'Comment added Successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comment = Comment::findOrFail($id);

        return view('comment.show', compact('comment'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $comment = Comment::findOrFail($id);

        return view('comment.edit', compact('comment'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'blog_id' => 'required|exists:blogs,id',
            'user_id' => 'nullable|exists:users,id',
            'comment'   => 'required',
            'status'   => 'required',
        ]);

        $comment = Comment::findOrFail($id);

        $comment->update($validatedData); // Update using validated data directly

        return redirect()->route('comment.index')->with('flash_message', 'Blog post updated Successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Comment::destroy($id);

        return redirect()->route('comment.index')->with('flash_message', 'Category deleted!');
    }
}