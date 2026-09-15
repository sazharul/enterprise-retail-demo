<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\OfferCombo;
use App\Models\OfferUpToSale;
use App\Models\SectionSixteen;
use Illuminate\Http\Request;
use RealRashid\SweetAlert\Facades\Alert;

class SectionSixteenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $sections = SectionSixteen::where('name', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $sections = SectionSixteen::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('section_sixteen.index', compact('sections'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        if ($request->ajax()) {
            // dd('working');
            $offer_id = $request->offer_id;
            $products = [];
            $combos = [];
            if ($offer_id !== '0') {
                dd($offer_id);
                $offer = Offer::findOrFail($offer_id);
                if ($offer->offer_type_id) {
                    $offered_products = OfferUpToSale::with('product')->where('status', 1)->where('offer_id', $offer->id)->get();
                    // dd($offered_products->product->name);
                    $products = $offered_products->groupBy('product_id')->map(function ($group) {
                        return $group->first();
                    });
                    // dd($products);
                } else {
                    $offered_combo_products = OfferCombo::with('comboProducts')->where('offer_id', $offer->id)->where('status', 1)->get();
                    $combos = $offered_combo_products->groupBy('combo_product_id')->map(function ($group) {
                        return $group->first();
                    });

                }
                // dd($products);
                return response()->json(['products' => $products ?: (object) $products, 'combos' => $combos ?: (object) $combos]);

            }

            $offered_products = OfferUpToSale::with('product')->where('status', 1)->get();
            $products = $offered_products->groupBy('product_id')->map(function ($group) {
                return $group->first();
            });
            $offered_combo_products = OfferCombo::with('comboProducts')->where('status', 1)->get();
            $combos = $offered_combo_products->groupBy('combo_product_id')->map(function ($group) {
                return $group->first();
            });
            // dd($combos);
            return response()->json(['products' => $products ?: (object) $products, 'combos' => $combos ?: (object) $combos]);
        }

        $offers = Offer::where('status', 1)->get();
        $sections = SectionSixteen::where('status', 1)->get();

        return view('section_sixteen.create', compact('offers', 'sections'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $checkedData = json_decode($request->input('checked_data'), true);
        // dd($checkedData);
        SectionSixteen::truncate();
        foreach ($checkedData as $data) {

            SectionSixteen::updateOrCreate(
                [
                    'product_id' => !empty($data['product_id']) ? $data['product_id'] : null,
                    'combo_product_id' => !empty($data['combo_product_id']) ? $data['combo_product_id'] : null,
                ],
            );
        }
        Alert::toast('Section 16 data updated successfully', 'success');

        return redirect()->route('section_sixteen.index');
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
