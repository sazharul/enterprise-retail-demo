<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Pack;
use Illuminate\Http\Request;

class PackController extends Controller
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
            $pack = Pack::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $pack = Pack::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('pack.index', compact('pack'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('pack.create');
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
        $validatedData = $request->validate([
            'name'  => 'required|string|max:255',
            'image' => 'image|max:2048',

        ]);
        $requestData = $request->all();
        $file = $request->file('image');
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/packs', $fileName);
            $path = '/images/packs/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        // Create a new brand with the processed data
        Pack::create($requestData);

        return redirect()->route('pack.index')->with('flash_message', 'Pack added!');
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
        $pack = Pack::findOrFail($id);

        return view('pack.show', compact('pack'));
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
        $pack = Pack::findOrFail($id);

        return view('pack.edit', compact('pack'));
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

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'image|max:2048',

        ]);


        $pack = Pack::findOrFail($id);
        $requestData = $request->all();

        $file = $request->file('image');
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/packs', $fileName);
            $path = '/images/packs/' . $fileName;

        } else {

            $path= $pack->image;
        }
        $requestData['image'] = $path;
        $pack->update($requestData);

        return redirect()->route('pack.index')->with('flash_message', 'Pack updated!');
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
        Pack::destroy($id);

        return redirect()->route('pack.index')->with('flash_message', 'Pack deleted!');
    }
}
