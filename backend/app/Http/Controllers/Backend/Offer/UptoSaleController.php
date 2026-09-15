<?php

namespace App\Http\Controllers\Backend\Offer;

use App\Models\Brand;
use App\Models\Offer;
use App\Models\Product;
use App\Models\Category;
use App\Models\OfferUpToSale;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use RealRashid\SweetAlert\Facades\Alert;

class UptoSaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offers = Offer::where('offer_type_id', 1)->where('status', 1)->withCount('UptoSales')->get();
        return view('offers.uptosale.index', compact('offers'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        if ($request->ajax()) {
            $categoryId = $request->category_id;
            $brandId = $request->brand_id;
            $offer_id = $request->offer_id;
            // dd($request->all());

            $subquery = Product::query();
            if ($categoryId !== "0") {
                $subquery->where('category_id', $categoryId);
            }
            if ($brandId !== "0") {
                $subquery->where('brand_id', $brandId);
            }


            if ($offer_id) {
                $p_shade_ids = OfferUpToSale::where('offer_id', $offer_id)->pluck('product_shade_id')->toArray();
                $p_size_ids = OfferUpToSale::where('offer_id', $offer_id)->pluck('product_size_id')->toArray();
            }
            else
            {
                $p_shade_ids = null;
                $p_size_ids = null;
            }

            $products = $subquery->with('productSizes.size', 'productShades.shade')->where('status', 1)->get();
            // dd($products);
            return response()->json(['products' => $products, 'p_shade_ids' =>$p_shade_ids, 'p_size_ids'=>$p_size_ids]);
        }

        $offers = Offer::where('offer_type_id', 1)->where('status', 1)->get();
        $offer = Offer::where('offer_type_id', 1)->where('status', 1)->first();
        $subquery = Product::query();
        if ($offer) {
            $p_shade_ids = OfferUpToSale::where('offer_id', $offer->id)->pluck('product_shade_id')->toArray();
            $p_size_ids = OfferUpToSale::where('offer_id', $offer->id)->pluck('product_size_id')->toArray();
        }
        else
        {
            $p_shade_ids = null;
            $p_size_ids = null;
        }
        $products = $subquery->where('status', 1)->get();
        $categories = Category::where('status', 1)->get();
        $brands = Brand::where('status', 1)->get();
        // dd($offers);
        return view('offers.uptosale.create', compact('offers', 'categories', 'brands', 'products','p_shade_ids','p_size_ids'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $checkedData = json_decode($request->input('checked_data'), true);
        // OfferUpToSale::where('offer_id', $request->offer_id)->delete();
        foreach ($checkedData as $data) {

            $product = Product::find($data['product_id']);

            $brand_id = $product->brand_id;
            $category_id = $product->category_id;

            // OfferUpToSale::truncate();

            OfferUpToSale::updateOrCreate(
                [
                    'offer_id' => $request->offer_id,
                    'product_id' => $data['product_id'],
                    'product_size_id' => !empty($data['product_size_id']) ? $data['product_size_id'] : null,
                    'product_shade_id' => !empty($data['product_shade_id']) ? $data['product_shade_id'] : null,
                ],
                [
                    'current_price' => $product->price,
                    'brand_id' => $brand_id,
                    'category_id' => $category_id,
                    'percent_discount' => $data['percent_discount'],
                    'flat_discount' => $data['flat_discount'],
                    'discounted_price' => $data['discounted_price'],
                ]
            );
        }
        Alert::toast('Offer data inserted successfully', 'success');

        return redirect()->route('uptosale.index');
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $offer = Offer::where('status', 1)->find($id);
        $uptoSales = OfferUpToSale::where('offer_id', $id)->get();
        $categories = Category::where('status', 1)->get();
        $brands = Brand::where('status', 1)->get();
        // dd($uptoSales);
        return view('offers.uptosale.edit', compact('categories', 'brands', 'offer','uptoSales'));
    }


    public function update(Request $request)
    {
        $checkedData = json_decode($request->input('checked_data'), true);
        OfferUpToSale::where('offer_id', $request->offer_id)->delete();
        foreach ($checkedData as $data) {

            $product = Product::find($data['product_id']);

            $brand_id = $product->brand_id;
            $category_id = $product->category_id;

            // OfferUpToSale::truncate();

            OfferUpToSale::updateOrCreate(
                [
                    'offer_id' => $request->offer_id,
                    'product_id' => $data['product_id'],
                    'product_size_id' => !empty($data['product_size_id']) ? $data['product_size_id'] : null,
                    'product_shade_id' => !empty($data['product_shade_id']) ? $data['product_shade_id'] : null,
                ],
                [
                    'current_price' => $product->price,
                    'brand_id' => $brand_id,
                    'category_id' => $category_id,
                    'percent_discount' => $data['percent_discount'],
                    'flat_discount' => $data['flat_discount'],
                    'discounted_price' => $data['discounted_price'],
                ]
            );
        }
        Alert::toast('Offer data inserted successfully', 'success');

        return redirect()->route('uptosale.index');

    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        OfferUpToSale::find($id)->delete();
        $output = Alert::toast('Offer data Deleted successfully', 'success');
        return redirect()->route('uptosale.index')->with('flash', $output);
    }
}
