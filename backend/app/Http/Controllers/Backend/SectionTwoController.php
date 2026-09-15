<?php

namespace App\Http\Controllers\Backend;

use App\Models\Offer;
use App\Models\SectionTwo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SectionTwoController extends Controller
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
            $section_two = SectionTwo::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $section_two = SectionTwo::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_two.index', compact('section_two'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $offers = Offer::where('status',1)->get();
        return view('section_two.create',compact('offers'));
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
            $file->move('images/SectionTwo', $fileName);
            $path = '/images/SectionTwo/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        SectionTwo::create($requestData);


        return redirect()->route('section_two.index')->with('flash_message', 'SectionTwo added!');

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
        $section_two = SectionTwo::findOrFail($id);

        return view('section_two.show', compact('section_two'));
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
        $section_two = SectionTwo::findOrFail($id);
        $offers = Offer::where('status',1)->get();
        return view('section_two.edit', compact('section_two','offers'));
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
        $section_two = SectionTwo::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionTwo', $fileName);
            $path = '/images/SectionTwo/' . $fileName;

            if (file_exists(public_path($section_two->image))) {
                unlink(public_path($section_two->image));
            }
        } else {
            $path= $section_two->image;
        }
        $requestData['image'] = $path;

        $section_two->update($requestData);

        return redirect()->route('section_two.index')->with('flash_message', 'SectionTwo Updated!');
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
        SectionTwo::destroy($id);

        return redirect()->route('section_two.index')->with('flash_message', 'SectionTwo Deleted!');
    }
}
