<?php

namespace App\Http\Controllers\Backend;

use App\Models\Offer;
use App\Models\SectionEight;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SectionEightController extends Controller
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
            $sections = SectionEight::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $sections = SectionEight::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_eight.index', compact('sections'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $offers = Offer::where('status',1)->get();
        return view('section_eight.create',compact('offers'));
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
            $file->move('images/SectionEight', $fileName);
            $path = '/images/SectionEight/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        SectionEight::create($requestData);


        return redirect()->route('section_eight.index')->with('flash_message', 'SectionEight added!');

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
        $sections = SectionEight::findOrFail($id);

        return view('section_eight.show', compact('sections'));
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
        $sections = SectionEight::findOrFail($id);
        $offers = Offer::where('status',1)->get();
        return view('section_eight.edit', compact('sections','offers'));
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
        $section_eight = SectionEight::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionEight', $fileName);
            $path = '/images/SectionEight/' . $fileName;

            if (file_exists(public_path($section_eight->image))) {
                unlink(public_path($section_eight->image));
            }
        } else {
            $path= $section_eight->image;
        }
        $requestData['image'] = $path;

        $section_eight->update($requestData);

        return redirect()->route('section_eight.index')->with('flash_message', 'SectionEight Updated!');
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
        SectionEight::destroy($id);

        return redirect()->route('section_eight.index')->with('flash_message', 'SectionEight Deleted!');
    }
}
