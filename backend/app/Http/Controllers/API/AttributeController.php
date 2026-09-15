<?php

namespace App\Http\Controllers\API;

use App\Models\Pack;
use App\Models\Brand;
use App\Models\Finish;
use App\Models\Gender;
use App\Models\Benefit;
use App\Models\Concern;
use App\Models\Country;
use App\Models\Category;
use App\Models\Coverage;
use App\Models\SkinType;
use App\Models\Ingredient;
use App\Models\Preference;
use App\Models\Formulation;
use App\Http\Resources\AttributeResource;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Product;

class AttributeController extends BaseController
{
    public function brand()
    {
        $brands = Brand::where('status', '1')->withCount('products')->orderBy('name')->get();
        return $this->sendResponse($brands, 'brand retrieved successfully.');
    }

    public function category()
    {
        // $category = Category::where('parent_id', 0)->where('status', '1')->with('subcategory.subcategory')->withCount('products')->get();
        $category = Category::where('parent_id', 0)
            ->where('status', '1')
            ->with([
                'subcategory.subcategory' => function ($query) {
                    $query->withCount('products')->where('status', '1');
                },
                'subcategory' => function ($query) {
                    $query->withCount('products')->where('status', '1');
                }
            ])
            ->withCount('products')
            ->orderBy('name')
            ->get();


        return $this->sendResponse($category, 'category retrieved successfully.');
    }

    public function preference()
    {
        $data = Preference::where('status', '1')->orderBy('name')->get();
        foreach ($data as $item) {
            $item->products_count = $item->product();
        }
        return $this->sendResponse(AttributeResource::collection($data), 'preference retrieved successfully.');
    }


    public function formulation()
    {
        $formulation = Formulation::where('status', '1')->orderBy('name')->withCount('products')->get();

        return $this->sendResponse(AttributeResource::collection($formulation), 'formulation retrieved successfully.');
    }

    public function finish()
    {
        $data = Finish::where('status', '1')->orderBy('name')->get();
        foreach ($data as $item) {
            $item->products_count = $item->products();
        }

        return $this->sendResponse(AttributeResource::collection($data), 'finish retrieved successfully.');
    }

    public function country()
    {
        $country = Country::where('status', '1')->orderBy('name')->withCount('products')->get();

        return $this->sendResponse(AttributeResource::collection($country), 'country retrieved successfully.');
    }

    public function gender()
    {
        $data = Gender::where('status', '1')->orderBy('name')->get();
        foreach ($data as $item) {
            $item->products_count = $item->products();
        }
        return $this->sendResponse(AttributeResource::collection($data), 'gender retrieved successfully.');
    }
    public function coverage()
    {
        $data = Coverage::where('status', '1')->orderBy('name')->withCount('products')->get();

        return $this->sendResponse(AttributeResource::collection($data), 'coverage retrieved successfully.');
    }

    public function skin()
    {
        $data = SkinType::where('status', '1')->orderBy('name')->withCount('products')->get();

        return $this->sendResponse(AttributeResource::collection($data), 'Skin Type retrieved successfully.');
    }

    public function benefit()
    {
        $data = Benefit::where('status', '1')->orderBy('name')->get();
        foreach ($data as $item) {
            $item->products_count = $item->products();
        }
        // dd($datas);
        return $this->sendResponse(AttributeResource::collection($data), 'Benefit retrieved successfully.');
    }

    public function concern()
    {
        $data = Concern::where('status', '1')->orderBy('name')->get();
        foreach ($data as $item) {
            $item->products_count = $item->products();
        }

        return $this->sendResponse(AttributeResource::collection($data), 'Concern retrieved successfully.');
    }

    public function ingredient()
    {
        $data = Ingredient::where('status', '1')->orderBy('name')->get();
        foreach ($data as $item) {
            $item->products_count = $item->products();
        }
        return $this->sendResponse(AttributeResource::collection($data), 'Ingredient retrieved successfully.');
    }

    public function pack()
    {
        $data = Pack::where('status', '1')->orderBy('name')->get();
        foreach ($data as $item) {
            $item->products_count = $item->products();
        }
        return $this->sendResponse(AttributeResource::collection($data), 'Pack Size retrieved successfully.');
    }
}
