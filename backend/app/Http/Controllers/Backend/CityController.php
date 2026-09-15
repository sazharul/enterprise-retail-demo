<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\District;
use Illuminate\Http\Request;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 10;

        if (!empty($keyword)) {
            $city = City::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $city = City::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('city.index', compact('city'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $districts = District::where('status',1)->get();

        return view('city.create', compact('districts'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'district_id' => 'required|exists:districts,id',
        ]);
        City::create($request->all());

        return redirect()->route('city.index')->with('flash_message', 'City added!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $city = City::findOrFail($id);

        return view('city.show', compact('city'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $city = City::findOrFail($id);
        $districts = District::where('status',1)->get();
        return view('city.edit', compact('city','districts'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required',
            'district_id' => 'required|exists:districts,id',

        ]);
        $city = City::findOrFail($id);
        $city->update($request->all());

        return redirect()->route('city.index')->with('flash_message', 'City updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        City::destroy($id);

        return redirect()->route('city.index')->with('flash_message', 'City deleted!');
    }
}
