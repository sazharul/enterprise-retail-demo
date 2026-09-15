<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $blog = Blog::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $blog = Blog::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('blog.index', compact('blog'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('blog.create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $request->validate([
            'title'         => 'required',
            'image'         => 'required|image|max:2048',
            'description'   => 'required',
        ]);


        $requestData = $request->all();
        $file = $request->image;
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/blogs', $fileName);
            $path = '/images/blogs/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        Blog::create($requestData);



        return redirect()->route('blog.index')->with('flash_message', 'Blog post added Successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $brand = Blog::findOrFail($id);

        return view('blog.show', compact('brand'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $blog = Blog::findOrFail($id);

        return view('blog.edit', compact('blog'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'image' => 'nullable|image|max:2048', // Allow image to be optional
            'description' => 'required',
            'status' => 'required'
        ]);

        $blog = Blog::findOrFail($id);
        $requestData = $request->all();
        $file = $request->file('image');
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/blogs', $fileName);
            $path = '/images/blogs/' . $fileName;           
        } else {

            $path= $blog->image;
        }
        $requestData['image'] = $path;
        $blog->update($validatedData); // Update using validated data directly

        return redirect()->route('blog.index')->with('flash_message', 'Blog post updated Successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Blog::destroy($id);

        return redirect()->route('blog.index')->with('flash_message', 'Category deleted!');
    }
}
