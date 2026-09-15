<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HomeSectionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sections = [
            [
                'title' => 'First Slider',
                'mobile_title' => 'First Slider',
                'banner' => '/images/HomeSections/170750745496950.png',
                'position' => 1,
                'type' => 3,
                'status' => '1',
            ],
            [
                'title' => 'Offers',
                'mobile_title' => '',
                'banner' => null,
                'position' => 2,
                'type' => 1,
                'status' => '1',
            ],
            [
                'title' => 'Explore Our Top Brands',
                'mobile_title' => 'Top Brands & Offers',
                'banner' => null,
                'position' => 4,
                'type' => 3,
                'status' => '1',
            ],
            [
                'title' => '',
                'mobile_title' => 'Deals You can\'t Miss',
                'banner' => null,
                'position' => 3,
                'type' => 2,
                'status' => '1',
            ],
            [
                'title' => 'Explore Our Top Brands',
                'mobile_title' => '',
                'banner' => null,
                'position' => 14,
                'type' => 1,
                'status' => '1',
            ],
            [
                'title' => 'Best Seller',
                'mobile_title' => 'Best Seller',
                'banner' => null,
                'position' => 6,
                'type' => 3,
                'status' => '1',
            ],
            [
                'title' => 'Explore Our Top Brands',
                'mobile_title' => '',
                'banner' => null,
                'position' => 7,
                'type' => 1,
                'status' => '1',
            ],
            [
                'title' => 'Featured Brands',
                'mobile_title' => '',
                'banner' => null,
                'position' => 8,
                'type' => 1,
                'status' => '1',
            ],
            [
                'title' => 'Best Offers for you',
                'mobile_title' => '',
                'banner' => null,
                'position' => 5,
                'type' => 1,
                'status' => '1',
            ],
            [
                'title' => '',
                'mobile_title' => 'Clearance Sale',
                'banner' => null,
                'position' => 10,
                'type' => 2,
                'status' => '1',
            ],
            [
                'title' => '',
                'mobile_title' => 'Tips And other Videos',
                'banner' => null,
                'position' => 17,
                'type' => 2,
                'status' => '1',
            ],
            [
                'title' => 'Category In Focus',
                'mobile_title' => 'Segments You can\'t miss',
                'banner' => null,
                'position' => 12,
                'type' => 3,
                'status' => '1',
            ],
            [
                'title' => '',
                'mobile_title' => 'Super Offer',
                'banner' => null,
                'position' => 11,
                'type' => 2,
                'status' => '1',
            ],
            [
                'title' => '',
                'mobile_title' => 'Top Concern',
                'banner' => null,
                'position' => 13,
                'type' => 2,
                'status' => '1',
            ],
            [
                'title' => 'New At GlowCart',
                'mobile_title' => '',
                'banner' => null,
                'position' => 15,
                'type' => 1,
                'status' => '1',
            ],
            [
                'title' => '',
                'mobile_title' => 'Mega Deals',
                'banner' => null,
                'position' => 9,
                'type' => 2,
                'status' => '1',
            ],
            [
                'title' => '',
                'mobile_title' => 'Personal Care',
                'banner' => null,
                'position' => 18,
                'type' => 2,
                'status' => '1',
            ],
            [
                'title' => 'Slider Image',
                'mobile_title' => '',
                'banner' => null,
                'position' => 16,
                'type' => 1,
                'status' => '1',
            ],
            [
                'title' => 'quotes',
                'mobile_title' => 'quotes',
                'banner' => null,
                'position' => 19,
                'type' => 3,
                'status' => '1',
            ],
        ];

        // Insert data into the database
        DB::table('home_sections')->insert($sections);
    }

    // php artisan db:seed --class=HomeSectionsTableSeeder

}
