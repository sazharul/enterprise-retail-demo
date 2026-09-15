<?php

namespace App\Http\Controllers\Backend;

use App\Models\Offer;
use App\Models\SectionEighteen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SectionEighteenController extends Controller
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
            $sections = SectionEighteen::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $sections = SectionEighteen::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_eighteen.index', compact('sections'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $offers = Offer::where('status',1)->get();
        return view('section_eighteen.create',compact('offers'));
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
            $file->move('images/SectionEighteen', $fileName);
            $path = '/images/SectionEighteen/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        SectionEighteen::create($requestData);


        return redirect()->route('section_eighteen.index')->with('flash_message', 'SectionEighteen added!');

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
        $sections = SectionEighteen::findOrFail($id);

        return view('section_eighteen.show', compact('sections'));
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
        $sections = SectionEighteen::findOrFail($id);
        $offers = Offer::where('status',1)->get();
        return view('section_eighteen.edit', compact('sections','offers'));
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
        $section_eighteen = SectionEighteen::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/SectionEighteen', $fileName);
            $path = '/images/SectionEighteen/' . $fileName;

            if (file_exists(public_path($section_eighteen->image))) {
                unlink(public_path($section_eighteen->image));
            }
        } else {
            $path= $section_eighteen->image;
        }
        $requestData['image'] = $path;

        $section_eighteen->update($requestData);

        return redirect()->route('section_eighteen.index')->with('flash_message', 'SectionEighteen Updated!');
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
        SectionEighteen::destroy($id);

        return redirect()->route('section_eighteen.index')->with('flash_message', 'SectionEighteen Deleted!');
    }
}
