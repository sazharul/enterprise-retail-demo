<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\HomeSection1;
use App\Models\Offer;
use Illuminate\Http\Request;

class HomeSection1Controller extends Controller
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
            $home_section1 = HomeSection1::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $home_section1 = HomeSection1::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('home_section1.index', compact('home_section1'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $offers = Offer::where('status',1)->get();
        return view('home_section1.create',compact('offers'));
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
            $file->move('images/Home_section1', $fileName);
            $path = '/images/Home_section1/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        HomeSection1::create($requestData);


        return redirect()->route('home_section1.index')->with('flash_message', 'HomeSection1 added!');

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
        $home_section1 = HomeSection1::findOrFail($id);

        return view('home_section1.show', compact('home_section1'));
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
        $home_section1 = HomeSection1::findOrFail($id);
        $offers = Offer::where('status',1)->get();
        return view('home_section1.edit', compact('home_section1','offers'));
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
        $home_section1 = HomeSection1::findOrFail($id);
        $requestData = $request->all();
        $file = $request->image;

        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/Home_section1', $fileName);
            $path = '/images/Home_section1/' . $fileName;
        } else {
            $path= $home_section1->image;
        }
        $requestData['image'] = $path;

        $home_section1->update($requestData);

        return redirect()->route('home_section1.index')->with('flash_message', 'HomeSection1 Updated!');
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
        HomeSection1::destroy($id);

        return redirect()->route('home_section1.index')->with('flash_message', 'HomeSection1 Deleted!');
    }
}
