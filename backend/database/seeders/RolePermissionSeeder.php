<?php
namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

/**
 * Class RolePermissionSeeder.
 *
 * @see https://spatie.be/docs/laravel-permission/v5/basic-usage/multiple-guards
 *
 * @package App\Database\Seeds
 */
class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Permission List as array
        $permissions = [
            [
                'menu_name' => 'dashboard',
                'permissions' => [
                    'dashboard_view',
                    'dashboard_edit',
                ]
            ],
            [
                'menu_name' => 'brand',
                'permissions' => [
                    // Brand Permissions
                    'brand_create',
                    'brand_view',
                    'brand_edit',
                    'brand_delete',
                ]
            ],
            [
                'menu_name' => 'category',
                'permissions' => [
                    // Category Permissions
                    'category_create',
                    'category_view',
                    'category_edit',
                    'category_delete',
                ]
            ],
        ];

        $roleSuperAdmin = Role::create(['name' => 'Super Admin', 'guard_name' => 'admin', 'status' => 1]);

        // Create and Assign Permissions
        for ($i = 0; $i < count($permissions); $i++) {
            $menu = $permissions[$i]['menu_name'];
            for ($j = 0; $j < count($permissions[$i]['permissions']); $j++) {
                // Create Permission
                $permission = Permission::create([
                    'name' => $permissions[$i]['permissions'][$j],
                    'menu_name' => $menu,
                    'guard_name' => 'admin',
                ]);
                $roleSuperAdmin->givePermissionTo($permission);
                $permission->assignRole($roleSuperAdmin);
            }
        }

        // Assign super admin role permission to superAdmin user
        $superAdmin = Admin::where('role_id', 1)->first();
        if ($superAdmin) {
            $superAdmin->assignRole($roleSuperAdmin);
        }
    }
}