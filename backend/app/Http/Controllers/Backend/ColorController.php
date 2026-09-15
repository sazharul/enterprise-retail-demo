<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
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
            $color = Color::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $color = Color::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('color.index', compact('color'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('color.create');
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
            $file->move('images/colors', $fileName);
            $path = '/images/colors/' . $fileName;
        } else {
            $path = null;
    }

        $requestData['image'] = $path;
        Color::create($requestData);

        return redirect()->route('color.index')->with('flash_message', 'Color added!');
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
        $color = Color::findOrFail($id);

        return view('color.show', compact('color'));
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
        $color = Color::findOrFail($id);

        return view('color.edit', compact('color'));
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


        $color = Color::findOrFail($id);
        $requestData = $request->all();

        $file = $request->file('image');
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/colors', $fileName);
            $path = '/images/colors/' . $fileName;

            
        } else {
            $path = $color->image;
            
        }
        $requestData['image'] = $path;
        $color->update($requestData);
        return redirect()->route('color.index')->with('flash_message', 'Color updated!');
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
        Color::destroy($id);

        return redirect()->route('color.index')->with('flash_message', 'Color deleted!');
    }

    
    /**
     * For Ajax Call.
     *
     */
    public function getColorList(){
        $colors = Color::with('shades')->where('status', 1)->orderBy('id', 'asc')->get();
        return response()->json($colors);
    }
    /**
     * For Ajax Call.
     *
     */
    public function getColorByID(Request $request){
        $color = Color::with('shades')->where('id', $request->id)->orderBy('id', 'asc')->first();
        return response()->json($color);
    }
}
