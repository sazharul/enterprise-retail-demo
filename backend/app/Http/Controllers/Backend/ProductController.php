<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Benefit;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Concern;
use App\Models\Country;
use App\Models\Coverage;
use App\Models\Finish;
use App\Models\Formulation;
use App\Models\Gender;
use App\Models\Ingredient;
use App\Models\Pack;
use App\Models\Preference;
use App\Models\Product;
use App\Models\ProductShade;
use App\Models\ProductShadeImage;
use App\Models\ProductSize;
use App\Models\ProductSizeImage;
use App\Models\Shade;
use App\Models\Size;
use App\Models\SkinType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()->get();
        return view('product.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories   = Category::where('parent_id', 0)->where('status', 1)->get();
        $brands       = Brand::where('status', 1)->get();
        $coverages    = Coverage::where('status', 1)->get();
        $formulations = Formulation::where('status', 1)->get();
        $countries    = Country::where('status', 1)->get();
        $skinTypes    = SkinType::where('status', 1)->get();
        $preferences  = Preference::where('status', 1)->get();
        $finishes     = Finish::where('status', 1)->get();
        $genders      = Gender::where('status', 1)->get();
        $benefits     = Benefit::where('status', 1)->get();
        $concerns     = Concern::where('status', 1)->get();
        $packs        = Pack::where('status', 1)->get();
        $sizes        = Size::where('status', 1)->get();
        $ingredients  = Ingredient::where('status', 1)->get();
        $shades       = Shade::where('status', 1)->get();
        return view('product.create', compact('categories', 'brands', 'coverages', 'formulations', 'countries', 'ingredients', 'skinTypes', 'preferences', 'finishes', 'genders', 'benefits', 'concerns', 'packs', 'sizes', 'shades'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {

            $request->validate([
                'slug'                  => 'unique:products',
                'category_id'           => 'required',
                'name'                  => 'required',
                'price'                 => 'required',
                'image'                 => 'required|mimes:webp,jpeg,avif,jpg,png|max:512',
                'size_price.*'          => 'sometimes|required',
                'shade_price.*'         => 'sometimes|required',
            ]);

            $product                      = new Product();
            $product->category_id         = $request->category_id;
            $product->sub_category_id     = $request->sub_category_id;
            $product->sub_sub_category_id = $request->sub_sub_category_id;
            $product->brand_id            = $request->brand_id;
            $product->coverage_id         = $request->coverage_id;
            $product->formulation_id      = $request->formulation_id;
            $product->country_id          = $request->country_id;
            $product->skin_type_id        = $request->skin_type_id;
            $product->preference_id       = $request->preference_id;
            $product->finish_id           = $request->finish_id;
            $product->gender_id           = $request->gender_id;
            $product->benefit_id          = $request->benefit_id;
            $product->concern_id          = $request->concern_id;
            $product->pack_id             = $request->pack_id;
            $product->ingredient_id       = $request->ingredient_id;
            $product->size_id             = $request->size_id;
            $product->shade_id            = $request->shade_id;

            $product->is_free_delivery       = $request->is_free_delivery ?? 0;
            $product->variation_type         = $request->variation_type;
            $product->name                   = $request->name;
            $product->slug                   = $request->slug;
            $product->price                  = $request->price;
            $product->discount_amount        = $request->discount_amount;
            $product->discount_percent       = $request->discount_percent;
            $product->discount_price         = $request->discount_price;
            $product->short_description      = $request->short_description;
            $product->description            = $request->description;
            $product->ingredient_description = $request->ingredient_description;
            $product->faq                    = $request->faq;
            $product->how_to_use             = $request->how_to_use;

            if ($request->hasFile('image')) {
                $request_file = $request->file('image');
                $extension    = $request_file->extension();
                $filename     = time() . rand(10, 1000) . '.' . $extension;
                $request_file->move(public_path('upload/products/'), $filename);
                $path           = 'upload/products/' . $filename;
                $product->image = $path;
            }

            $product->save();

            if ($request->variation_type == 'shade') {

                foreach ($request->shade_price as $key => $value) {

                    $shadeData = [
                        'product_id'  => $product->id,
                        'shade_id'    => (int) $request->shade_id[$key],
                        'shade_price' => $request->shade_price[$key] ?? 0,
                    ];
                    $productShade = ProductShade::create($shadeData);

                    if ($request->hasFile('product_shade_image.' . $request->shade_id[$key])) {

                        foreach ($request->file('product_shade_image.' . $request->shade_id[$key]) as $image) {
                            $filename = time() . rand(10, 1000) . '.' . $image->extension();
                            $image->move(public_path('upload/products/product_shade_images'), $filename)->getPathName();
                            $path              = 'upload/products/product_shade_images/' . $filename;
                            $productShadeImage = new ProductShadeImage([
                                'product_shade_id'    => $productShade->id,
                                'shade_id'            => (int) $request->shade_id,
                                'product_id'          => $product->id,
                                'product_shade_image' => $path,
                            ]);
                            $productShadeImage->save();
                        }

                    }

                }

            } else {

                foreach ($request->size_price as $key => $value) {

                    $sizeData = [
                        'product_id' => $product->id,
                        'size_id'    => (int) $request->size_id[$key],
                        'size_price' => $request->size_price[$key] ?? 0,
                    ];

                    $productSize = ProductSize::create($sizeData);

                    if ($request->hasFile('product_size_image.' . $request->size_id[$key])) {

                        foreach ($request->file('product_size_image.' . $request->size_id[$key]) as $image) {
                            $filename = time() . rand(10, 1000) . '.' . $image->extension();
                            $image->move(public_path('upload/products/product_size_images'), $filename)->getPathName();
                            $path             = 'upload/products/product_size_images/' . $filename;
                            $productSizeImage = new ProductSizeImage([
                                'product_size_id'    => $productSize->id,
                                'size_id'            => (int) $request->size_id[$key],
                                'product_id'         => $product->id,
                                'product_size_image' => $path,
                            ]);
                            $productSizeImage->save();
                        }

                    }

                }

            }

            DB::commit();
            return redirect()->route('product.index')->with('success', 'Product Created Successfully..!!');
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withInput()->withErrors(['error' => 'Validation failed: ' . $e->getMessage()]);
        }

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
        $product      = Product::with(['productShades.shade', 'productShades.productShadeImages'])->find($id);
        $categories   = Category::where('parent_id', 0)->where('status', 1)->get();
        $brands       = Brand::where('status', 1)->get();
        $coverages    = Coverage::where('status', 1)->get();
        $formulations = Formulation::where('status', 1)->get();
        $countries    = Country::where('status', 1)->get();
        $skinTypes    = SkinType::where('status', 1)->get();
        $preferences  = Preference::where('status', 1)->get();
        $finishes     = Finish::where('status', 1)->get();
        $genders      = Gender::where('status', 1)->get();
        $benefits     = Benefit::where('status', 1)->get();
        $concerns     = Concern::where('status', 1)->get();
        $packs        = Pack::where('status', 1)->get();
        $sizes        = Size::where('status', 1)->get();
        $ingredients  = Ingredient::where('status', 1)->get();
        $shades       = Shade::where('status', 1)->get();

        return view('product.edit', compact('product', 'categories', 'brands', 'coverages', 'formulations', 'countries', 'skinTypes', 'preferences', 'finishes', 'genders', 'benefits', 'concerns', 'packs', 'sizes', 'ingredients', 'shades'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'slug'                  => 'required|unique:products,slug,' . $id,
                'category_id'           => 'required',
                'name'                  => 'required',
                'price'                 => 'required',
                'size_price.*'          => 'sometimes|required',
                'shade_price.*'         => 'sometimes|required',
            ]);

            $product                      = Product::with(['productShades.shade', 'productShades.productShadeImages'])->findOrFail($id);
            $product->category_id         = $request->category_id;
            $product->sub_category_id     = $request->sub_category_id;
            $product->sub_sub_category_id = $request->sub_sub_category_id;
            $product->brand_id            = $request->brand_id;
            $product->coverage_id         = $request->coverage_id;
            $product->formulation_id      = $request->formulation_id;
            $product->country_id          = $request->country_id;
            $product->skin_type_id        = $request->skin_type_id;
            $product->preference_id       = $request->preference_id;
            $product->finish_id           = $request->finish_id;
            $product->gender_id           = $request->gender_id;
            $product->benefit_id          = $request->benefit_id;
            $product->concern_id          = $request->concern_id;
            $product->pack_id             = $request->pack_id;
            $product->ingredient_id       = $request->ingredient_id;
            $product->size_id             = $request->size_id;
            $product->shade_id            = $request->shade_id;

            $product->variation_type         = $request->variation_type;
            $product->name                   = $request->name;
            $product->slug                   = $request->slug;
            $product->price                  = $request->price;
            $product->discount_amount        = $request->discount_amount;
            $product->discount_percent       = $request->discount_percent;
            $product->discount_price         = $request->discount_price;
            $product->short_description      = $request->short_description;
            $product->description            = $request->description;
            $product->ingredient_description = $request->ingredient_description;
            $product->faq                    = $request->faq;
            $product->how_to_use             = $request->how_to_use;

            if ($request->hasFile('image')) {

                if ($product->image && file_exists(public_path($product->image))) {
                    unlink(public_path($product->image));
                }

                $request_file = $request->file('image');
                $extension    = $request_file->getClientOriginalExtension();
                $filename     = time() . rand(10, 1000) . '.' . $extension;
                $request_file->move(public_path('upload/products/'), $filename);
                $product->image = 'upload/products/' . $filename;
            }

            $product->save();

            // $product->productShades->each(function ($productShade) {
            //     $productShade->delete();
            // });
            
            // $product->productSizes->each(function ($productSize) {
            //     $productSize->delete();
            // });


            if ($product->variation_type == 'shade') {

                foreach ($request->shade_price as $key => $value) {
                    // $shadeData = [
                    //     'product_id'  => $product->id,
                    //     'shade_id'    => (int) $request->shade_id[$key],
                    //     'shade_price' => $request->shade_price[$key] ?? 0,
                    // ];

                    // $productShade = ProductShade::updateOrCreate(
                    //     ['product_id' => $product->id, 'shade_id' => $shadeData['shade_id']],
                    //     $shadeData
                    // );

                    $shadeData = [
                        'shade_id'    => (int)$request->shade_id[$key],
                        'shade_price' => $value ?? 0,
                    ];
                    $productShade = $product->productShades()->updateOrCreate(['shade_id' => $shadeData['shade_id']], $shadeData);

                    if ($request->hasFile('product_shade_image.' . $request->shade_id[$key])) {

                        foreach ($request->file('product_shade_image.' . $request->shade_id[$key]) as $image) {
                            $filename = time() . rand(10, 1000) . '.' . $image->extension();
                            $image->move(public_path('upload/products/product_shade_images'), $filename)->getPathName();
                            $path              = 'upload/products/product_shade_images/' . $filename;
                            $productShadeImage = new ProductShadeImage([
                                'product_shade_id'    => $productShade->id,
                                'shade_id'            => (int) $request->shade_id,
                                'product_id'          => $product->id,
                                'product_shade_image' => $path,
                            ]);
                            $productShadeImage->save();
                        }

                    }

                }

            } else {

                foreach ($request->size_price as $key => $value) {

                    // $sizeData = [
                    //     'product_id' => $product->id,
                    //     'size_id'    => (int) $request->size_id[$key],
                    //     'size_price' => $request->size_price[$key] ?? 0,
                    // ];

                    // $productSize = ProductSize::updateOrCreate(
                    //     ['product_id' => $product->id, 'size_id' => $sizeData['size_id']],
                    //     $sizeData
                    // );
                    $sizeData = [
                        'size_id'    => (int)$request->size_id[$key],
                        'shade_price' => $value ?? 0,
                    ];
                    $productSize = $product->productSizes()->updateOrCreate(['size_id' => $sizeData['size_id']], $sizeData);


                    if ($request->hasFile('product_size_image.' . $request->size_id[$key])) {

                        foreach ($request->file('product_size_image.' . $request->size_id[$key]) as $image) {
                            $filename = time() . rand(10, 1000) . '.' . $image->extension();
                            $image->move(public_path('upload/products/product_size_images'), $filename)->getPathName();
                            $path             = 'upload/products/product_size_images/' . $filename;
                            $productSizeImage = new ProductSizeImage([
                                'product_size_id'    => $productSize->id,
                                'size_id'            => (int) $request->size_id[$key],
                                'product_id'         => $product->id,
                                'product_size_image' => $path,
                            ]);
                            $productSizeImage->save();
                        }

                    }

                }

            }

            DB::commit();
            return redirect()->route('product.index')->with('success', 'Product Updated Successfully..!!');
        } catch (\Exception $e) {
            DB::rollback();
            return $e;
             return redirect()->back()->withInput()->withErrors(['error' => 'Validation failed: ' . $e->getMessage()]);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

    }

    public function deleteShadeImage(Request $request)
    {
        $image = ProductShadeImage::find($request->image_id);

        if ($image) {

            if (File::exists(public_path($image->product_shade_image))) {
                File::delete(public_path($image->product_shade_image));
            }

            $image->delete();
            return response()->json(['success' => true, 'message' => 'Image deleted successfully']);
        }

        return response()->json(['error' => 'Image not found'], 404);
    }
    public function deleteSizeImage(Request $request)
    {
        $image = ProductSizeImage::find($request->image_id);

        if ($image) {

            if (File::exists(public_path($image->product_size_image))) {
                File::delete(public_path($image->product_size_image));
            }

            $image->delete();
            return response()->json(['success' => true, 'message' => 'Image deleted successfully']);
        }

        return response()->json(['error' => 'Image not found'], 404);
    }

    public function getProducts()
    {
        $chunkSize = 100;
        $products  = [];

        Product::where('status', 1)->select('id', 'name')->chunk($chunkSize, function ($chunkProducts) use (&$products) {
            $products = array_merge($products, $chunkProducts->toArray());
        });

        return response()->json($products);
    }

    public function getProductsByID(Request $request)
    {
        $product  = Product::where('status', 1)->findOrFail($request->id);
        $response = ['product' => $product];

        if (!is_null($product->size_id)) {
            $sizes = Size::whereIn('id', $product->size_id)->get(['id', 'name']);

            if ($sizes->isNotEmpty()) {
                $response['size_names'] = $sizes->toArray();
            }

        }

        if (!is_null($product->shade_id)) {
            $sizes = Shade::whereIn('id', $product->shade_id)->get(['id', 'name']);

            if ($sizes->isNotEmpty()) {
                $response['shade_names'] = $sizes->toArray();
            }

        }

        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function sizeShadeWisePrice(Request $request)
    {

        if ($request->variant_type == 'shade') {
            $response = ProductShade::where('product_id', $request->product_id)
                ->where('shade_id', $request->variant_id)
                ->first();

            return response()->json($response);
        } else {
            $response = ProductSize::where('product_id', $request->product_id)
                ->where('size_id', $request->variant_id)
                ->first();

            return response()->json($response);
        }

    }

    public function multipleVariantWisePrice(Request $request)
    {

        if ($request->variant_type == 'shade') {
            $response = ProductShade::where('product_id', $request->product_id)
                ->whereIn('shade_id', $request->variant_ids)
                ->get(['id', 'shade_id', 'shade_price']);

            return response()->json($response);
        } else {
            $response = ProductSize::where('product_id', $request->product_id)
                ->whereIn('size_id', $request->variant_ids)
                ->get(['id', 'size_id', 'size_price']);
            return response()->json($response);
        }

    }

}
