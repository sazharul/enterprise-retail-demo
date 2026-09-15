<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Category;
use App\Models\Offer;
use App\Models\OfferCombo;
use App\Models\OfferUpToSale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class OfferController extends BaseController {
    /**
     * Display a listing of the resource.
     */
    public function offerList(Request $request) {
        $offers = Offer::where('status', 1)->get();
        return $this->sendResponse($offers, 'Offers retrieved successfully.');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) {
        $validator = Validator::make($request->all(), [
            'offer_id' => 'required|exists:offers,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $offer = Offer::where('status', 1)->findOrFail($request->offer_id);

        if (!$offer) {
            return $this->sendError('Offer not found.', [], 404);
        }

        $perPage       = (int) $request->pagination ?? 15;
        $keyword       = $request->search;
        $sort_by_name  = $request->sort_by_name ?? '';
        $sort_by_price = $request->sort_by_price ?? '';

        if ($sort_by_name === 'asc' || $sort_by_name === 'desc') {
            $orderByField     = 'name';
            $orderByDirection = $sort_by_name;
        } elseif ($sort_by_price === 'asc' || $sort_by_price === 'desc') {
            $orderByField     = 'discounted_price';
            $orderByDirection = $sort_by_price;
        } else {
            $orderByField     = 'created_at';
            $orderByDirection = 'asc';
        }

        if (Offer::find($request->offer_id)->offer_type_id == 1) {
            $categoryIds = OfferUpToSale::where('offer_id', $request->offer_id)
                ->distinct('category_id')
                ->pluck('category_id');
            $categories = Category::whereIn('id', $categoryIds);

            // Apply search
            if ($keyword) {
                $categories->whereHas('products', function ($query) use ($keyword) {
                    $query->where('name', 'like', '%' . $keyword . '%');
                });
            }

            $categories = $categories->get();

            foreach ($categories as $category) {
                // dd($category);
                $productsQuery = OfferUpToSale::with('product')
                    ->join('products', 'offer_up_to_sales.product_id', '=', 'products.id')
                    ->select('offer_up_to_sales.product_id', 'offer_up_to_sales.offer_id', 'offer_up_to_sales.category_id', DB::raw('MAX(offer_up_to_sales.discounted_price) as discounted_price'), DB::raw('MAX(offer_up_to_sales.id) as id')) // Selecting specific columns with aggregate functions
                    ->where('offer_up_to_sales.offer_id', $request->offer_id)
                    ->where('offer_up_to_sales.category_id', $category->id)
                    ->groupBy('offer_up_to_sales.product_id', 'offer_up_to_sales.offer_id', 'offer_up_to_sales.category_id');

                    // Apply sorting
                if ($orderByField === 'name') {
                    $productsQuery->orderBy('products.name', $orderByDirection); // Sort products by name
                } elseif ($orderByField === 'price') {
                    $productsQuery->orderBy('discounted_price', $orderByDirection); // Sort products by discounted price
                }

                $products                  = $productsQuery->paginate($perPage);
                $category['products']      = $products;
            }

            $response = $categories;
            $offer['data'] = $response;
        } else {
            $response = OfferCombo::with(['comboProducts' => function ($query) use ($orderByField, $orderByDirection) {
                $query->orderBy($orderByField, $orderByDirection);
            },
            ])
                ->where('offer_id', $request->offer_id)
                ->paginate($perPage);
            $offer['data'] = $response;
        }


        return $this->sendResponse($offer, 'Products retrieved successfully.');

    }

}
