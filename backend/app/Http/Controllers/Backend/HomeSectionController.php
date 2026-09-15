<?php

namespace App\Http\Controllers\Backend;

use App\Models\HomeSection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HomeSectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {

        $home_section = HomeSection::orderBy('id', 'asc')->get();
        return view('home_section.index', compact('home_section'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('home_section.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(Request $request)
    {

        // dd($request->all());
        $validated = $request->validate([
            'title' => 'required',
            'image' => 'image|max:2048',
            'position' => 'required|integer|unique:home_sections,position',
        ]);


        $requestData = $request->all();
        $file = $request->image;
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/HomeSections', $fileName);
            $path = '/images/HomeSections/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['banner'] = $path;
        HomeSection::create($requestData);


        return redirect()->route('home_section.index')->with('flash_message', 'HomeSection added!');

    }


    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\View\View
     */
    public function show($id)
    {
        $home_section = HomeSection::findOrFail($id);

        return view('home_section.show', compact('home_section'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\View\View
     */
    public function edit($id)
    {
        $home_section = HomeSection::findOrFail($id);

        return view('home_section.edit', compact('home_section'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required',
            'image' => 'image|max:2048',
        ]);
        $home_section = HomeSection::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/HomeSections', $fileName);
            $path = '/images/HomeSections/' . $fileName;

            if (file_exists(public_path($home_section->banner))) {
                unlink(public_path($home_section->banner));
            }
        } else {
            $path= $home_section->banner;
        }
        $requestData['banner'] = $path;

        $home_section->update($requestData);

        return redirect()->route('home_section.index')->with('flash_message', 'HomeSection Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function destroy($id)
    {
        HomeSection::destroy($id);

        return redirect()->route('home_section.index')->with('flash_message', 'HomeSection Deleted!');
    }
}
