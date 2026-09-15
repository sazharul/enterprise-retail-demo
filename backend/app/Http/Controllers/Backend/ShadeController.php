<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Color;
use App\Models\Shade;
use Illuminate\Http\Request;

class ShadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 10;

        if (!empty($keyword)) {
            $shade = Shade::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $shade = Shade::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('shade.index', compact('shade'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $colors = Color::where('status',1)->get();

        return view('shade.create', compact('colors'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'image' => 'image|max:2048',
            'color_id' => 'required|exists:colors,id',
        ]);
        $requesteddata =$request->all();
        $file = $request->file('image');
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/shades', $fileName);
            $path = '/images/shades/' . $fileName;
        } else {
            $path = null;
        }
        $requesteddata['image']=$path;

        Shade::create($requesteddata);

        return redirect()->route('shade.index')->with('flash_message', 'Shade added!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $shade = Shade::findOrFail($id);

        return view('shade.show', compact('shade'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $shade = Shade::findOrFail($id);
        $colors = Color::where('status',1)->get();
        return view('shade.edit', compact('shade','colors'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'image' => 'image|max:2048',
            'color_id' => 'required|exists:colors,id',

        ]);
        $shade = Shade::findOrFail($id);
        $requestData = $request->all();
        $file = $request->file('image');
        if ($file) {
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . rand(1, 999999) . '.' . $extension;
            $file->move('images/shades', $fileName);
            $path = '/images/shades/' . $fileName;
        } else {

            $path= $shade->image;
        }
        $requestData['image'] = $path;
        $shade->update($requestData);

        return redirect()->route('shade.index')->with('flash_message', 'Shade updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Shade::destroy($id);

        return redirect()->route('shade.index')->with('flash_message', 'Shade deleted!');
    }
}
