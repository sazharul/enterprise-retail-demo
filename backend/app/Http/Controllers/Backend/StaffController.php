<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use App\Http\Requests\StaffRequest;
use App\Http\Requests\StaffUpdateRequest;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staffs = Admin::with('role')->where('id', '<>', 1)->get();
        return view('staff.index', compact('staffs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::where('id', '<>', 1)->get();
        return view('staff.create', compact('roles'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StaffRequest $request)
    {
        $staff = new Admin();
        if ($request->hasFile('avatar')) {
            $request_file = $request->file('avatar');
            $extension    = $request_file->extension();
            $filename     = time() . rand(10, 1000) . '.' . $extension;
            $request_file->move(public_path('upload/staffs'), $filename);
            $staff->avatar = $filename;
        }
        $staff->name             = $request->name;
        $staff->email            = $request->email;
        $staff->phone           = $request->phone;
        $staff->role_id          = $request->role_id;
        $staff->password         = Hash::make($request->password);
        $staff->save();

        return redirect()->route('staff.index')->with('success', 'Staff Created Successfully..!!');
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
        $staff = Admin::findOrFail($id);
        $roles = Role::where('id', '<>', 1)->get();
        return view('staff.edit', compact('staff', 'roles'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $staff = Admin::findOrFail($id);

        if ($request->hasFile('avatar')) {
            $destination = public_path('upload/staffs/' . $staff->avatar);

            if (file_exists($destination)) {
                unlink($destination);
            }

            $request_file = $request->file('avatar');
            $extension    = $request_file->extension();
            $filename     = time() . rand(10, 1000) . '.' . $extension;
            $request_file->move(public_path('upload/staffs'), $filename);
            $staff->avatar = $filename;
        }

        $password = $request->password;
        if ($password !== null && $password !== "") {
            $staff->password = Hash::make($request->password);
        }

        $staff->name             = $request->name;
        $staff->email            = $request->email;
        $staff->phone           = $request->phone;
        $staff->role_id          = $request->role_id;
        $staff->save();

        return redirect()->route('staff.index')->with('success', 'Staff Updated Successfully..!!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Admin::findOrFail($id)->delete();
        return redirect()->route('staff.index')->with('success', 'Staff Deleted Successfully..!!');
    }
}
