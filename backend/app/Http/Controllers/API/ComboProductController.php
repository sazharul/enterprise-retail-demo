<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\ComboProduct;
use App\Models\Offer;
use Illuminate\Http\Request;

class ComboProductController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function offerList(Request $request)
    {
        $offers = Offer::where('status', 1)->get();
        return $this->sendResponse($offers, 'Offers retrieved successfully.');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = (int)$request->pagination ?? 15;
        $keyword = $request->search;
        $sort_by_name = $request->sort_by_name ?? 'asc';
        $sort_by_price = $request->sort_by_price ?? 'asc';

        if ($sort_by_name === 'asc' || $sort_by_name === 'desc') {
            $orderByField = 'name';
            $orderByDirection = $sort_by_name;
        } elseif ($sort_by_price === 'asc' || $sort_by_price === 'desc') {
            $orderByField = 'price';
            $orderByDirection = $sort_by_price;
        } else {
            $orderByField = 'created_at';
            $orderByDirection = 'asc';
        }

        $response = ComboProduct::select('combo_products.*')
        ->join('offer_combos', 'combo_products.id', '=', 'offer_combos.combo_product_id')
        ->orderBy($orderByField, $orderByDirection)
        ->when($keyword, function ($query) use ($keyword) {
            $query->where('combo_products.name', 'like', '%' . $keyword . '%');
        })
        ->distinct()
        ->paginate($perPage);

        return $this->sendResponse($response, 'Products retrieved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $comboProduct = ComboProduct::with([
            'offerCombo.offer',
            'comboProductDetails.comboProductInfos.shade',
            'comboProductDetails.comboProductInfos.size'
        ])->findOrFail($id);


        return $this->sendResponse($comboProduct, 'Combo Product detail retrieved successfully.');
    }

}
