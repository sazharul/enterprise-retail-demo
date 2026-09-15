<?php

namespace App\Http\Controllers\Backend;

use App\Models\Offer;
use App\Models\SectionFour;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SectionFourController extends Controller
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
            $sections = SectionFour::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $sections = SectionFour::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_four.index', compact('sections'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $offers = Offer::where('status',1)->get();
        return view('section_four.create',compact('offers'));
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
            $file->move('images/SectionFour', $fileName);
            $path = '/images/SectionFour/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        SectionFour::create($requestData);


        return redirect()->route('section_four.index')->with('flash_message', 'SectionFour added!');

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
        $sections = SectionFour::findOrFail($id);

        return view('section_four.show', compact('sections'));
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
        $sections = SectionFour::findOrFail($id);
        $offers = Offer::where('status',1)->get();
        return view('section_four.edit', compact('sections','offers'));
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
        $section_four = SectionFour::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionFour', $fileName);
            $path = '/images/SectionFour/' . $fileName;

            if (file_exists(public_path($section_four->image))) {
                unlink(public_path($section_four->image));
            }
        } else {
            $path= $section_four->image;
        }
        $requestData['image'] = $path;

        $section_four->update($requestData);

        return redirect()->route('section_four.index')->with('flash_message', 'SectionFour Updated!');
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
        SectionFour::destroy($id);

        return redirect()->route('section_four.index')->with('flash_message', 'SectionFour Deleted!');
    }
}
