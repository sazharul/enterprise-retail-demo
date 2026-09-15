<?php

namespace App\Http\Controllers\Backend;

use App\Models\Offer;
use App\Models\SectionNine;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SectionNineController extends Controller
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
            $sections = SectionNine::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $sections = SectionNine::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_nine.index', compact('sections'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $offers = Offer::where('status',1)->get();
        return view('section_nine.create',compact('offers'));
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
            $file->move('images/SectionNine', $fileName);
            $path = '/images/SectionNine/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        SectionNine::create($requestData);


        return redirect()->route('section_nine.index')->with('flash_message', 'SectionNine added!');

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
        $sections = SectionNine::findOrFail($id);

        return view('section_nine.show', compact('sections'));
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
        $sections = SectionNine::findOrFail($id);
        $offers = Offer::where('status',1)->get();
        return view('section_nine.edit', compact('sections','offers'));
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
        $section_nine = SectionNine::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionNine', $fileName);
            $path = '/images/SectionNine/' . $fileName;

            if (file_exists(public_path($section_nine->image))) {
                unlink(public_path($section_nine->image));
            }
        } else {
            $path= $section_nine->image;
        }
        $requestData['image'] = $path;

        $section_nine->update($requestData);

        return redirect()->route('section_nine.index')->with('flash_message', 'SectionNine Updated!');
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
        SectionNine::destroy($id);

        return redirect()->route('section_nine.index')->with('flash_message', 'SectionNine Deleted!');
    }
}
