<?php

namespace App\Http\Controllers\Backend;

use App\Models\Brand;
use App\Models\Offer;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\OfferUpToSale;
use App\Models\SectionSevenTeen;
use App\Http\Controllers\Controller;
use RealRashid\SweetAlert\Facades\Alert;

class SectionSeventeenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $sections = SectionSevenTeen::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $sections = SectionSevenTeen::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_seventeen.index', compact('sections'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        if ($request->ajax()) {
            $categoryId = $request->category_id;
            $brandId = $request->brand_id;
            
            $subquery = Product::query();
            if ($categoryId !== "0") {
                $subquery->where('category_id', $categoryId);
            }
            if ($brandId !== "0") {
                $subquery->where('brand_id', $brandId);
            }

            $products = $subquery->with('productSizes.size', 'productShades.shade')->where('status', 1)->get();

            return response()->json(['products' => $products]);
        }


        $sections = SectionSevenTeen::where('status',1)->get();

        $products = Product::where('status', 1)->get();
        $categories = Category::where('status', 1)->get();
        $brands = Brand::where('status', 1)->get();

        return view('section_seventeen.create', compact('categories', 'brands', 'products','sections'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $checkedData = json_decode($request->input('checked_data'), true);
        // dd($checkedData);
        SectionSevenTeen::truncate();
        foreach ($checkedData as $data) {

            SectionSevenTeen::updateOrCreate(
                [
                    'product_id' => $data['product_id'],
                ],
            );
        }
        Alert::toast('Section 17 data updated successfully', 'success');

        return redirect()->route('section_seventeen.index');
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
