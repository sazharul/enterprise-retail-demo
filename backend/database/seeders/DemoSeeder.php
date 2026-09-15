<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        Admin::query()->updateOrCreate(
            ['email' => 'admin@glowcart.demo'],
            [
                'name' => 'GlowCart Admin',
                'phone' => '01700000001',
                'role_id' => 1,
                'status' => 1,
                'password' => Hash::make('DemoAdmin123!'),
            ]
        );

        User::query()->updateOrCreate(
            ['email' => 'customer@glowcart.demo'],
            [
                'name' => 'Demo Customer',
                'phone' => '01700000002',
                'password' => Hash::make('DemoUser123!'),
                'otp' => null,
            ]
        );

        if (DB::table('products')->count() > 0) {
            return;
        }

        $warehouseId = DB::table('warehouses')->insertGetId([
            'name' => 'GlowCart Demo Warehouse',
            'email' => 'warehouse@glowcart.demo',
            'address' => 'Demo Industrial Area, Dhaka, Bangladesh',
            'mobile' => '01700-000000',
            'default' => 1,
            'status' => '1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $brands = [
            ['name' => 'PureGlow', 'image' => null, 'is_popular' => 1, 'is_top_brand' => 1, 'status' => '1'],
            ['name' => 'SilkSkin', 'image' => null, 'is_popular' => 1, 'is_top_brand' => 0, 'status' => '1'],
            ['name' => 'RadiantLab', 'image' => null, 'is_popular' => 0, 'is_top_brand' => 1, 'status' => '1'],
            ['name' => 'VelvetCare', 'image' => null, 'is_popular' => 1, 'is_top_brand' => 0, 'status' => '1'],
        ];

        $brandIds = [];
        foreach ($brands as $brand) {
            $brandIds[] = DB::table('brands')->insertGetId(array_merge($brand, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }

        $categoryNames = ['Cleanser', 'Serum', 'Moisturizer', 'Sunscreen'];
        $categoryIds = [];
        foreach ($categoryNames as $name) {
            $categoryIds[] = DB::table('categories')->insertGetId([
                'name' => $name,
                'image' => null,
                'icon' => null,
                'status' => '1',
                'parent_id' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $placeholder = 'images/HomeSections/170750745496950.png';

        $productTemplates = [
            ['Hydrating Gel Cleanser', 0, 890, 10],
            ['Gentle Foam Cleanser', 0, 750, 0],
            ['Micellar Cleansing Water', 0, 620, 5],
            ['Clay Detox Cleanser', 0, 980, 15],
            ['Vitamin C Brightening Serum', 1, 1450, 10],
            ['Hyaluronic Acid Serum', 1, 1320, 0],
            ['Niacinamide 10% Serum', 1, 1180, 12],
            ['Retinol Night Serum', 1, 1680, 8],
            ['Peptide Repair Serum', 1, 1550, 0],
            ['Daily Gel Moisturizer', 2, 920, 10],
            ['Rich Cream Moisturizer', 2, 1100, 0],
            ['Oil-Free Moisturizer', 2, 850, 5],
            ['Night Recovery Cream', 2, 1280, 15],
            ['Ceramide Barrier Cream', 2, 1350, 0],
            ['SPF 50 Sunscreen Gel', 3, 1050, 10],
            ['SPF 30 Daily Sunscreen', 3, 890, 0],
            ['Tinted SPF 40', 3, 1150, 8],
            ['Mineral Sunscreen SPF 50', 3, 1220, 12],
            ['Hydrating Toner', 0, 680, 0],
            ['Exfoliating Toner', 0, 720, 5],
            ['Eye Cream Revive', 2, 980, 10],
            ['Lip Balm SPF 15', 3, 350, 0],
            ['Face Mask Detox', 0, 550, 15],
            ['Body Lotion Silk', 2, 780, 0],
        ];

        foreach ($productTemplates as $index => [$name, $categoryIndex, $price, $discountPercent]) {
            $brandId = $brandIds[$index % count($brandIds)];
            $categoryId = $categoryIds[$categoryIndex];
            $slug = Str::slug($name) . '-' . ($index + 1);
            $discountAmount = round($price * $discountPercent / 100, 2);
            $discountPrice = $price - $discountAmount;

            $productId = DB::table('products')->insertGetId([
                'name' => $name,
                'slug' => $slug,
                'brand_id' => $brandId,
                'category_id' => $categoryId,
                'sub_category_id' => null,
                'sub_sub_category_id' => null,
                'variation_type' => 'size',
                'price' => $price,
                'discount_amount' => $discountAmount,
                'discount_percent' => $discountPercent,
                'discount_price' => $discountPrice,
                'image' => $placeholder,
                'tax' => 0,
                'short_description' => 'Demo skincare product for GlowCart portfolio showcase.',
                'description' => 'Synthetic product data — not affiliated with any real brand.',
                'how_to_use' => 'Apply as directed on packaging. Demo only.',
                'is_free_delivery' => 0,
                'is_combo' => 0,
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('stocks')->insert([
                'warehouse_id' => $warehouseId,
                'product_id' => $productId,
                'shade_id' => null,
                'size_id' => null,
                'quantity' => 100,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        DB::table('section_ones')->insert([
            'section_id' => 1,
            'name' => 'Welcome to GlowCart',
            'image' => $placeholder,
            'offer_id' => null,
            'status' => '1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $blogPosts = [
            ['Skincare Routine Basics', 'skincare-routine-basics'],
            ['How to Choose a Sunscreen', 'how-to-choose-sunscreen'],
            ['Understanding Serums', 'understanding-serums'],
        ];

        foreach ($blogPosts as [$title, $slug]) {
            DB::table('blogs')->insert([
                'title' => $title,
                'image' => $placeholder,
                'description' => '<p>Demo blog content for the GlowCart portfolio showcase. Not affiliated with any production retailer.</p>',
                'status' => '1',
                'slug' => $slug,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
