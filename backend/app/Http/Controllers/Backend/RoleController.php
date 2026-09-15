<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\RoleStoreRequest;
use App\Http\Requests\RoleUpdateRequest;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        $roles = Role::latest()->get();
        return view('role.index', compact('roles'));
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create()
    {
        $permissionMenus = getPermissionMenus();
        // dd($permissionMenus);
        return view('role.create',compact('permissionMenus'));
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(RoleStoreRequest $request)
    {
        DB::beginTransaction();
        try {

            ##Create Role
            $role = Role::create([
                'name' => $request->name, 
                'guard_name' => 'admin',
            ]);

            $permissions = $request->permissions;
    
            if (!empty($permissions)) {
                $role->syncPermissions($permissions);
            }

            DB::commit();
            return redirect()->route('role.index')->with('success', 'Role Created Successfully');

        } catch (\Exception$e) {
            DB::rollback();

            return $e;
            return redirect()->back()->with('fail', __('language.data_save_error'));
        }
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id)
    {
        return view('backend.show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id)
    {
        $role = Role::findOrFail($id);
        $permissions = Permission::all();
        // dd($permissions);
        $permissionMenus = getPermissionMenus();
        return view('role.edit', compact('role', 'permissions', 'permissionMenus'));
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(RoleUpdateRequest $request, $id)
    {
        DB::beginTransaction();
        try {

            $roleUpdate = Role::findOrFail($id);
            $permissions = $request->permissions;

            if (!empty($permissions)) {
                $roleUpdate->name = $request->name;
                $roleUpdate->save();
                $roleUpdate->syncPermissions($permissions);
            }

        DB::commit();
            return redirect()->route('role.index')->with('success', 'Role Updated Successfully');

        } catch (\Exception$e) {
            DB::rollback();
            
            return $e;
            return redirect()->back()->with('fail', __('language.data_save_error'));
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id)
    {
        Role::findOrFail($id)->delete();
        return redirect()->route('role.index')->with('success', 'Role Deleted Successfully..!!');
        // return response()->json(['success' => 'success']);
    }
}
