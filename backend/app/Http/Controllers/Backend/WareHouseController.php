<?php

namespace App\Http\Controllers\Backend;

use App\Models\Warehouse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WareHouseController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $warehouses = Warehouse::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $warehouses = Warehouse::orderBy('id', 'asc')->paginate($perPage);
        }
// dd($warehouses);
        return view('warehouse.index', compact('warehouses'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('warehouse.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|unique:warehouses',
            'email' => 'email|required',
            'logo' => 'image|max:512',
        ]);

        $warehouse = new Warehouse();
        $warehouse->name = $request->name;
        $warehouse->email = $request->email;
        $warehouse->address = $request->address;
        $warehouse->mobile = $request->mobile;
        $warehouse->latitude = $request->latitude;
        $warehouse->longitude = $request->longitude;


        if (Warehouse::count() == 0) {
            $warehouse->default = 1;
        } else {
            if ($request->has('default')) {
                $warehouse->default = 1;
                Warehouse::where('default', 1)->update(['default' => 0]);
            }
        }


        $warehouse->status = $request->status;
        if ($request->hasFile('logo')) {
            $request_file = $request->file('logo');
            $extension    = $request_file->extension();
            $filename     = time() . rand(10, 1000) . '.' . $extension;
            $request_file->move(public_path('upload/warehouse'), $filename);
            $path = 'upload/warehouse/'.$filename;
            $warehouse->logo = $path;
        }
        $warehouse->save();

        return redirect()->route('warehouse.index')->with('success', 'Warehouse Created Successfully..!!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $warehouse = Warehouse::find($id);
        return view('warehouse.edit', compact('warehouse'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name'  => 'required|string|unique:ware_houses,name,' . $id,
            'email' => 'email|required',
            'logo' => 'image|max:512',
        ]);

        $warehouse = Warehouse::findOrFail($id);
        $warehouse->name = $request->name;
        $warehouse->email = $request->email;
        $warehouse->address = $request->address;
        $warehouse->mobile = $request->mobile;
        $warehouse->latitude = $request->latitude;
        $warehouse->longitude = $request->longitude;

        if ($request->has('default')) {
            $warehouse->default = 1;
            Warehouse::where('default', 1)->where('id', '<>', $id)->update(['default' => 0]);
        } else {
            $warehouse->default = 0;
        }
        
        $warehouse->status = $request->status;

        if ($request->hasFile('logo')) {

            if ($warehouse->logo && file_exists(public_path('/') . $warehouse->logo)) {
                unlink(public_path('/') . $warehouse->logo);
            }
            $request_file = $request->file('logo');
            $extension    = $request_file->extension();
            $filename     = time() . rand(10, 1000) . '.' . $extension;
            $request_file->move(public_path('upload/warehouse'), $filename);
            $path = 'upload/warehouse/'.$filename;
            $warehouse->logo = $path;
        }
        $warehouse->save();

        return redirect()->route('warehouse.index')->with('success', 'Warehouse Updated Successfully..!!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $warehouse = Warehouse::find($id)->delete();
        return redirect()->route('warehouse.index')->with('success', 'Warehouse Deleted Successfully..!!');
    }
}
