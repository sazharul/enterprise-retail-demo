<?php

namespace App\Http\Controllers\Backend;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\SectionTwelve;
use App\Http\Controllers\Controller;

class SectionTwelveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $sections = SectionTwelve::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $sections = SectionTwelve::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_twelve.index', compact('sections'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::where('status', 1)
        ->whereNotIn('id', function ($query) {
        $query->select('category_id')
        ->from(with(new SectionTwelve)->getTable());

    })
    ->get();
    // dd()
        return view('section_twelve.create',compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'image|max:2048',
        ]);

        $requestData = $request->all();
        $file = $request->image;
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionTwelve', $fileName);
            $path = '/images/SectionTwelve/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;

        SectionTwelve::create($requestData);
        return redirect()->route('section_twelve.index')->with('flash_message', 'SectionTwelve Added!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $sections = SectionTwelve::findOrFail($id);
        $categories = Category::where('status', 1)
        ->whereNotIn('id', function ($query) {
        $query->select('category_id')
        ->from(with(new SectionTwelve)->getTable());

    })
    ->get();
        return view('section_twelve.edit', compact('sections','categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $section_twelve = SectionTwelve::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionTwelve', $fileName);
            $path = '/images/SectionTwelve/' . $fileName;


            if (file_exists(public_path($section_twelve->image))) {
                unlink(public_path($section_twelve->image));
            }
        } else {
            $path= $section_twelve->image;
        }
        $requestData['image'] = $path;

        $section_twelve->update($requestData);

        return redirect()->route('section_twelve.index')->with('flash_message', 'SectionTwelve Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        SectionTwelve::destroy($id);

        return redirect()->route('section_twelve.index')->with('flash_message', 'SectionTwelve Deleted!');
    }
}
