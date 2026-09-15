<?php

namespace App\Http\Controllers\Backend\Offer;

use App\Http\Controllers\Controller;
use App\Models\ComboProduct;
use App\Models\ComboProductDetail;
use App\Models\ComboProductInfo;
use App\Models\Offer;
use App\Models\OfferCombo;
use App\Models\Product;
use App\Models\ProductShade;
use App\Models\ProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ComboOfferController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $offers = Offer::with(['offerCombos'])->where('offer_type_id', 2)->where('status', 1)->withCount('offerCombos')->get();

        return view('offers.combo_offer.index', compact('offers'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $offers = Offer::where('offer_type_id', 2)
        ->where('status', 1)
        ->doesntHave('offerCombos')
        ->get();

        $comboProducts = ComboProduct::with(['comboProductDetails'])->get();
        return view('offers.combo_offer.create', compact('offers', 'comboProducts'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {

            $request->validate([
                'offer_id' => 'required',
                'combo_product_id' => 'required|array|min:1',
            ], [
                'combo_product_id.required' => 'Please make sure at least one product is selected.',
            ]);

            foreach ($request->combo_product_id as $comboProductID) {
                $offerCombo = new OfferCombo();
                $offerCombo->offer_id = $request->offer_id;
                $offerCombo->combo_product_id = $comboProductID;
                $offerCombo->save();


                $comboDetailsIDs = ComboProductDetail::where('combo_product_id', $offerCombo->combo_product_id)->get();
                foreach ($comboDetailsIDs as $key => $value) {
                    $comboProductInfos = ComboProductInfo::where('combo_product_detail_id', $value->id )->get();
                    foreach ($comboProductInfos as $key => $comboProductInfo) {
                        // dd($comboProductInfo);
                        $comboProductInfo->update(['offer_id' => $request->offer_id]);
                    }
                }
                // $comboDetailsIDs = ComboProductDetail::where('combo_product_id', $offerCombo->combo_product_id)->get();
                // foreach ($comboDetailsIDs as $key => $value) {
                //     $comboProductInfos = ComboProductInfo::where('combo_product_detail_id', $value->id )->get();
                //     foreach ($comboProductInfos as $key => $comboProductInfo) {
                //         $comboProductInfo->update(['offer_id' => $request->offer_id]);
                //     }
                // }
            }

            // dd('test');

            DB::commit();
            return redirect()->route('combo_offer.index')->with('success', 'Combo Offer created successfully.');
        } catch (\Exception$e) {
            DB::rollback();
            return $e;
            return redirect()->back()->with('fail', 'Date Server ');
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
        $offer = Offer::where('offer_type_id', 2)->where('status', 1)->find($id);
        $comboOffers = OfferCombo::where('offer_id', $id)->pluck('combo_product_id');
        $comboProducts = ComboProduct::get();

        return view('offers.combo_offer.edit', compact('offer', 'comboOffers', 'comboProducts'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'offer_id' => 'required',
                'combo_product_id' => 'required|array|min:1',
            ], [
                'combo_product_id.required' => 'Please make sure at least one product is selected.',
            ]);

            $offerCombos = OfferCombo::where('offer_id', $id)->get();
            $offerCombos->each(function ($offerCombo) {
                $offerCombo->delete();
            });

            // dd($request->combo_product_id);
            foreach ($request->combo_product_id as $comboProductID) {
                // dd($comboProductID);
                $offerCombo = new OfferCombo();
                $offerCombo->offer_id = $request->offer_id;
                $offerCombo->combo_product_id = $comboProductID;
                $offerCombo->save();


                // echo $offerCombo->offer_id;
                // //Update offer id at Combo Product Inf Table
                // $comboDetailsIDs = ComboProductDetail::where('combo_product_id', $offerCombo->combo_product_id)->get();
                // foreach ($comboDetailsIDs as $key => $value) {
                //     $comboProductInfos = ComboProductInfo::where('combo_product_detail_id', $value->id )->get();
                //     foreach ($comboProductInfos as $key => $comboProductInfo) {
                //         $comboProductInfo->update(['offer_id' => $request->offer_id]);
                //     }
                // }

                $comboDetailsIDs = ComboProductDetail::where('combo_product_id', $offerCombo->combo_product_id)->pluck('id')->toArray();

                $productIDs = ComboProductDetail::where('combo_product_id', $offerCombo->combo_product_id)->pluck('product_id')->toArray();



                ComboProductInfo::whereIn('combo_product_detail_id', $comboDetailsIDs )
                ->whereIn('product_id', $productIDs )->update([
                    'offer_id' => $request->offer_id,
                ]);

                // foreach ($comboDetailsIDs as $key => $value) {
                //     $comboProductInfos = ComboProductInfo::where('combo_product_detail_id', $value->id )->update([
                //         'offer_id' => $request->offer_id,
                //     ]);

                //     // foreach ($comboProductInfos as $key => $comboProductInfo) {
                //     //     $comboProductInfo->offer_id = $request->offer_id;
                //     //     $comboProductInfo->save();

                //     //     // dd($comboProductInfo->offer_id);
                //     //     // $comboProductInfo->update(['offer_id' => $request->offer_id]);
                //     //     // dd('test');
                //     // }
                // }
            }

            DB::commit();
            return redirect()->route('combo_offer.index')->with('success', 'Combo Offer Updated successfully.');
        } catch (\Exception$e) {
            DB::rollback();
            return $e;
            return redirect()->back()->with('fail', 'Date Server ');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function sizeShadeWisePrice(Request $request) {

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

    public function multipleVariantWisePrice(Request $request) {

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
