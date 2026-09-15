<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\SkinType;
use Illuminate\Http\Request;

class SkinTypeController extends Controller
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
            $skin = SkinType::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $skin = SkinType::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('skin.index', compact('skin'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('skin.create');
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
            $file->move('images/skins', $fileName);
            $path = '/images/skins/' . $fileName;
        } else {
            $path = null;
        }
        $requestData['image'] = $path;
        // Create a new brand with the processed data
        SkinType::create($requestData);

        return redirect()->route('skin.index')->with('flash_message', 'Skin Type added!');
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
        $skin = SkinType::findOrFail($id);

        return view('skin.show', compact('skin'));
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
        $skin = SkinType::findOrFail($id);

        return view('skin.edit', compact('skin'));
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


        $skin = SkinType::findOrFail($id);
        $requestData = $request->all();

        $file = $request->file('image');
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/skins', $fileName);
            $path = '/images/skins/' . $fileName;

        } else {

            $path= $skin->image;
        }
        $requestData['image'] = $path;
        $skin->update($requestData);

        return redirect()->route('skin.index')->with('flash_message', 'Skin Type updated!');
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
        SkinType::destroy($id);

        return redirect()->route('skin.index')->with('flash_message', 'Skin Type deleted!');
    }
}
