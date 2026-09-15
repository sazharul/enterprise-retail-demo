<?php

namespace App\Http\Controllers\Backend\Offer;

use App\Http\Controllers\Controller;
use App\Models\ComboProduct;
use App\Models\ComboProductDetail;
use App\Models\ComboProductInfo;
use App\Models\ProductShade;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ComboProductController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $comboProducts = collect();
        ComboProduct::orderBy('created_at', 'DESC')
            ->chunkById(50, function ($combo) use (&$comboProducts) {
                $comboProducts = $comboProducts->concat($combo);
            });
        return view('offers.combo_product.index', compact('comboProducts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        return view('offers.combo_product.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) 
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'name'     => 'required',
                'slug'     => 'required|unique:combo_products',
                'image'    => 'required|mimes:avif,webp,jpg,png|max:10240',
                'images.*' => 'nullable|mimes:avif,webp,jpg,png|max:10240',
                'price'    => 'sometimes|required',
                'quantity' => 'sometimes|required',
            ]);

            $comboProduct              = new ComboProduct();
            $comboProduct->name        = $request->name;
            $comboProduct->slug        = $request->slug;
            $comboProduct->description = $request->description;
            $comboProduct->original_price = $request->original_price ?? 0;
            $comboProduct->discounted_price = $request->discounted_price ?? 0;

            $flat_discount = $request->original_price - $request->discounted_price;
            $comboProduct->flat_discount = $flat_discount < 0 ? 0 : $flat_discount;
            
            $comboProduct->is_optional = $request->is_optional ?? 0;

            if ($request->hasFile('image')) {
                $request_file = $request->file('image');
                $extension    = $request_file->extension();
                $filename     = time() . rand(10, 1000) . '.' . $extension;
                $request_file->move(public_path('upload/offer/combo_product/'), $filename);
                $path                = 'upload/offer/combo_product/' . $filename;
                $comboProduct->image = $path;
            }

            if ($request->hasFile('images')) {
                $images = [];

                foreach ($request->file('images') as $document) {
                    $filename = time() . rand(10, 1000) . '.' . $document->extension();
                    $document->move(public_path('upload/offer/combo_product'), $filename);
                    $path     = 'upload/offer/combo_product/' . $filename;
                    $images[] = $path;
                }

                $comboProduct->images = json_encode($images);
            }
            
            $comboProduct->save();

            foreach ($request->product_id as $i => $product_id) {
                $comboProductDetail = new ComboProductDetail();
                $comboProductDetail->combo_product_id = $comboProduct->id;
                $comboProductDetail->product_id = $product_id;
                $comboProductDetail->save();
            
                if ($request->is_optional == 1) {
                    if ($request->variant_type[$i] == 'shade') {
                        foreach ($request->variation_id[$i + 1] as $key => $shade_id) {
                            $comboProductInfo = new ComboProductInfo();
                            $comboProductInfo->combo_product_detail_id = $comboProductDetail->id;
                            $comboProductInfo->combo_product_id = $comboProductDetail->combo_product_id;
                            $comboProductInfo->product_id = $product_id;
                            $comboProductInfo->price = $request->price[$i + 1][$key] ?? 0;
                            $comboProductInfo->actual_price = $request->actual_price[$i + 1][$key] ?? 0;
                            $comboProductInfo->shade_id = $shade_id;
                            $comboProductInfo->quantity = $request->quantity[$i + 1][$key] ?? 0;
                            $comboProductInfo->save();
                        }
                    } else {
                        foreach ($request->variation_id[$i + 1] as $key => $size_id) {
                            $comboProductInfo = new ComboProductInfo();
                            $comboProductInfo->combo_product_detail_id = $comboProductDetail->id;
                            $comboProductInfo->combo_product_id = $comboProductDetail->combo_product_id;
                            $comboProductInfo->product_id = $product_id;
                            $comboProductInfo->price = $request->price[$i + 1][$key] ?? 0;
                            $comboProductInfo->actual_price = $request->actual_price[$i + 1][$key] ?? 0;
                            $comboProductInfo->size_id = $size_id;
                            $comboProductInfo->quantity = $request->quantity[$i + 1][$key] ?? 0;
                            $comboProductInfo->save();
                        }
                    }
                } else {
                    $comboProductInfo = new ComboProductInfo();
                    $comboProductInfo->combo_product_detail_id = $comboProductDetail->id;
                    $comboProductInfo->combo_product_id = $comboProductDetail->combo_product_id;
                    $comboProductInfo->product_id = $product_id;
                    $comboProductInfo->actual_price = $request->actual_price[$i] ?? 0;
                    $comboProductInfo->price = $request->price[$i] ?? 0;

                    if ($request->variant_type[$i] == 'shade') {
                        $comboProductInfo->shade_id = $request->variation_id[$i];
                        $comboProductInfo->size_id = null;
                    } else {
                        $comboProductInfo->size_id = $request->variation_id[$i];
                        $comboProductInfo->shade_id = null;
                    }

                    $comboProductInfo->quantity = $request->quantity[$i];
                    $comboProductInfo->save(); 
                }
            }
            
            DB::commit();
            return redirect()->route('combo_product.index')->with('success', 'Combo Product Created Successfully..!!');
        } catch (\Exception$e) {
            DB::rollback();
            return $e;
            return redirect()->back()->with('fail', 'Date Server Error');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {

    }

   
}
