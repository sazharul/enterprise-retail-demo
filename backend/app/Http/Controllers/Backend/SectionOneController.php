<?php

namespace App\Http\Controllers\Backend;

use App\Models\Offer;
use App\Models\SectionOne;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SectionOneController extends Controller
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
            $section_one = SectionOne::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $section_one = SectionOne::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_one.index', compact('section_one'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $offers = Offer::where('status',1)->get();
        return view('section_one.create',compact('offers'));
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
            $file->move('images/SectionOne', $fileName);
            $path = '/images/SectionOne/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        SectionOne::create($requestData);


        return redirect()->route('section_one.index')->with('flash_message', 'SectionOne added!');

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
        $section_one = SectionOne::findOrFail($id);

        return view('section_one.show', compact('section_one'));
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
        $section_one = SectionOne::findOrFail($id);
        $offers = Offer::where('status',1)->get();
        return view('section_one.edit', compact('section_one','offers'));
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
        $section_one = SectionOne::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionOne', $fileName);
            $path = '/images/SectionOne/' . $fileName;


            if (file_exists(public_path($section_one->image))) {
                unlink(public_path($section_one->image));
            }
        } else {
            $path= $section_one->image;
        }
        $requestData['image'] = $path;

        $section_one->update($requestData);

        return redirect()->route('section_one.index')->with('flash_message', 'SectionOne Updated!');
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
        SectionOne::destroy($id);

        return redirect()->route('section_one.index')->with('flash_message', 'SectionOne Deleted!');
    }
}
