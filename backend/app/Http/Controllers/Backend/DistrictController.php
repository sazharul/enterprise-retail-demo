<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\District;
use Illuminate\Http\Request;

class DistrictController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 10;

        if (!empty($keyword)) {
            $district = District::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $district = District::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('district.index', compact('district'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('district.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',

        ]);
        District::create($request->all());

        return redirect()->route('district.index')->with('flash_message', 'District added!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $district = District::findOrFail($id);

        return redirect()->route('district.show', compact('district'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $district = District::findOrFail($id);

        return view('district.edit', compact('district'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required',

        ]);
        $district = District::findOrFail($id);
        $district->update($request->all());

        return redirect()->route('district.index')->with('flash_message', 'District updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        District::destroy($id);

        return redirect()->route('district.index')->with('flash_message', 'District deleted!');
    }
}
