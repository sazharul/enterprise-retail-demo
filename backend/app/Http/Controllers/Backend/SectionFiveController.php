<?php

namespace App\Http\Controllers\Backend;

use App\Models\Offer;
use App\Models\SectionFive;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SectionFiveController extends Controller
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
            $sections = SectionFive::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $sections = SectionFive::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_five.index', compact('sections'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $offers = Offer::where('status',1)->get();
        return view('section_five.create',compact('offers'));
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
            $file->move('images/SectionFive', $fileName);
            $path = '/images/SectionFive/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        SectionFive::create($requestData);


        return redirect()->route('section_five.index')->with('flash_message', 'SectionFive added!');

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
        $sections = SectionFive::findOrFail($id);

        return view('section_five.show', compact('sections'));
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
        $sections = SectionFive::findOrFail($id);
        $offers = Offer::where('status',1)->get();
        return view('section_five.edit', compact('sections','offers'));
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
        $section_five = SectionFive::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionFive', $fileName);
            $path = '/images/SectionFive/' . $fileName;

            if (file_exists(public_path($section_five->image))) {
                unlink(public_path($section_five->image));
            }
        } else {
            $path= $section_five->image;
        }
        $requestData['image'] = $path;

        $section_five->update($requestData);

        return redirect()->route('section_five.index')->with('flash_message', 'SectionFive Updated!');
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
        SectionFive::destroy($id);

        return redirect()->route('section_five.index')->with('flash_message', 'SectionFive Deleted!');
    }
}
