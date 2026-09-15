<?php

namespace App\Http\Controllers\Backend;


use App\Models\SectionEleven;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SectionElevenController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\View\View
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $sections = SectionEleven::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $sections = SectionEleven::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_eleven.index', compact('sections'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {

        return view('section_eleven.create');
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
        $validated = $request->validate([
            'name' => 'required',
            'image' => 'image|max:2048',
        ]);


        $requestData = $request->all();
        $file = $request->image;
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionEleven', $fileName);
            $path = '/images/SectionEleven/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        SectionEleven::create($requestData);


        return redirect()->route('section_eleven.index')->with('flash_message', 'SectionEleven added!');

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
        $sections = SectionEleven::findOrFail($id);

        return view('section_eleven.show', compact('sections'));
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
        $sections = SectionEleven::findOrFail($id);

        return view('section_eleven.edit', compact('sections'));
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
            'name' => 'required',
            'image' => 'image|max:2048',
        ]);
        $section_eleven = SectionEleven::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionEleven', $fileName);
            $path = '/images/SectionEleven/' . $fileName;

            if (file_exists(public_path($section_eleven->image))) {
                unlink(public_path($section_eleven->image));
            }
        } else {
            $path= $section_eleven->image;
        }
        $requestData['image'] = $path;

        $section_eleven->update($requestData);

        return redirect()->route('section_eleven.index')->with('flash_message', 'SectionEleven Updated!');
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
        SectionEleven::destroy($id);

        return redirect()->route('section_eleven.index')->with('flash_message', 'SectionEleven Deleted!');
    }
}
