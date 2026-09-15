<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductShade;
use App\Models\ProductSize;
use App\Models\Reward;
use App\Models\RewardHistory;
use App\Models\RewardSetup;
use App\Models\Shade;
use App\Models\Size;
use App\Models\Stock;
use App\Models\User;
use App\Models\Warehouse;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PosController extends Controller {

    public function index() {

        $allUsers = collect();
        User::orderBy('created_at', 'DESC')
            ->chunkById(50, function ($users) use (&$allUsers) {
                $allUsers = $allUsers->concat($users);
            });

        $products   = Product::where('status', 1)->get();
        $categories = Category::where('status', 1)->get();
        $brands     = Brand::where('status', 1)->get();
        $sizes      = Size::where('status', 1)->get();
        $shades     = Shade::where('status', 1)->get();

        return view('pos.index', compact('products', 'categories', 'brands', 'sizes', 'shades', 'allUsers'));
    }

    public function search(Request $request) {

        if ($request->ajax()) {
            $products = Product::where('name', 'LIKE', '%' . $request->search . '%')
                ->orWhere('price', 'LIKE', '%' . $request->search . '%')
                ->get();
            return response()->json($products);
        }

    }

    public function filterProducts(Request $request) {
        $categoryId = $request->input('category_id');
        $brandId    = $request->input('brand_id');

        $products = Product::query();

        if ($categoryId) {
            $products->where('category_id', $categoryId);
        }

        if ($brandId) {
            $products->where('brand_id', $brandId);
        }

        $filteredProducts = $products->get();

        return response()->json($filteredProducts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function store(Request $request) {
        DB::beginTransaction();
        try {
            $request->validate([
                'order_no'              => 'unique:orders',
                'user_id'               => 'required',
                'tax_amount'            => 'numeric',
                'sub_total'             => 'numeric',
                'grand_total'           => 'numeric',
                'total_discount_amount' => 'numeric',
                'product_id.*'          => 'required',
                'quantity.*'            => 'required|numeric',
                'price.*'               => 'required',
                'documents.*'           => 'mimes:pdf,jpg,png|max:10240',
                'size_id'               => 'required_without_all:shade_id',
                'shade_id'              => 'required_without_all:size_id',
            ]);

            $order                        = new Order();
            $order->user_id               = $request->user_id;
            $order->order_no              = $this->generateOrderNumber();
            $order->total_quantity        = $request->total_quantity;
            $order->sub_total             = $request->sub_total;
            $order->delivery_charge       = $request->delivery_charge ?? 60;
            $order->total_discount_amount = $request->discount_price ?? 0.00;
            $order->coupon_code           = $request->coupon_code ?? null;
            $order->coupon_discount       = $request->coupon_code_discount ?? 0.00;
            $order->tax_amount            = $request->tax_amount ?? 0.00;
            $order->grand_total           = $request->grand_total ?? 0.00;

            // Calculate reward points based on the order amount
            $order->reward_points = $this->calculateRewardPoints($order->sub_total);
            $order->save();

            $product_id = $request->product_id;

            for ($i = 0, $n = count($product_id); $i < $n; $i++) {
                $orderDetails = new OrderDetail();

                $productImage = Product::find($product_id[$i])->select('image')->first();

                $orderDetails->order_id      = $order->id;
                $orderDetails->product_id    = $request->product_id[$i];
                $orderDetails->product_name  = $request->product_name[$i];
                $orderDetails->product_image = $productImage->image;
                $orderDetails->price         = $request->price[$i];
                $orderDetails->quantity      = $request->quantity[$i];
                $orderDetails->discount      = $request->discount[$i] ?? 0.00;
                $orderDetails->discount_type = $request->discount_type[$i] ?? null;
                $orderDetails->size          = $request->size[$i] ?? null;
                $orderDetails->size_id       = $request->size_id[$i] ?? null;
                $orderDetails->shade         = $request->shade[$i] ?? null;
                $orderDetails->shade_id      = $request->shade_id[$i] ?? null;
                $orderDetails->save();

                $warehouse = Warehouse::where('default', 1)->first();
                $productId = $request->product_id[$i];
                $shade_id  = $request->shade_id[$i] ?? null;
                $size_id   = $request->size_id[$i] ?? null;

                $existingStock = Stock::where([
                    'warehouse_id' => $warehouse->id,
                    'product_id'   => $productId,
                    'shade_id'     => $shade_id,
                    'size_id'      => $size_id,
                ])->first();

                if ($existingStock) {
                    $existingStock->quantity -= $request->quantity[$i];
                    $existingStock->save();
                } else {
                    return redirect()->back()->with('fail', 'Stock Not Available');
                }

            }

            $reward = Reward::where('user_id', $request->user_id)->first(); 
            $rewardPointsEarned = $order->reward_points;
        
            if ($reward) {
                // Update existing reward record
                $reward->total_point += $rewardPointsEarned;
                $reward->remaining_point += $rewardPointsEarned;
                $reward->used_point += (int)$request->reward_point;
                $reward->save();
            } else {
                // Create new reward record for the user
                $reward = Reward::create([
                    'user_id' => $request->user_id,
                    'total_point' => $rewardPointsEarned,
                    'used_point' => (int)$request->reward_point,
                    'remaining_point' => $rewardPointsEarned,
                ]);
            }
            
            // Log reward points earned in reward history
            RewardHistory::create([
                'user_id' => $request->user_id,
                'order_id' => $order->id,
                'using_point' => (int)$request->reward_point,
            ]);

            DB::commit();
            return redirect()->back()->with('success', 'Sale Created Successfully..!!');
        } catch (\Exception $e) {
            DB::rollback();
            return $e;
            return redirect()->back()->with('fail', 'Date Server Error');
        }

    }

    private function generateOrderNumber() {
        $timestamp    = now()->timestamp;
        $randomNumber = mt_rand(1000, 9999);
        $randomString = Str::random(6);
        $orderNumber  = $timestamp . $randomNumber . $randomString;
        $orderNumber  = substr($orderNumber, 0, 12);
        return 'ORD' . $orderNumber;
    }

    private function calculateRewardPoints($amount) {
        $reward = RewardSetup::first();

        if ($reward && $reward->amount > 0) {
            $rewardPoints = floor($amount / $reward->amount) * $reward->reward_point;
            return $rewardPoints;
        } else {
            return 0;
        }

    }

    public function shadeWisePriceStock(Request $request) {
        $response = ProductShade::with(['shade', 'uptoSale', 'freeDelivery'])
            ->where('product_id', $request->product_id)
            ->where('shade_id', $request->shade_id)
            ->first();

        if (!$response) {
            // Handle case where product shade is not found
            return response()->json(['error' => 'Product shade not found'], 404);
        }
    
        $stockQuantity = Stock::where('product_id', $request->product_id)
            ->where('shade_id', $request->shade_id)
            ->value('quantity');
    
        $now = Carbon::now();
    
       // Check uptoSale offers
        $uptoSaleOffers = [];
        foreach ($response->uptoSale as $uptoSale) {
            $offer = $uptoSale->offer()
                ->where('status', 'active')
                ->whereDate('start_date', '<=', $now)
                ->whereDate('expiry_date', '>=', $now)
                ->first();

            if ($offer) {
                $uptoSaleOffers[] = $offer;
            }
        }

        // Check freeDelivery offers
        $freeDeliveryOffers = [];
        foreach ($response->freeDelivery as $freeDelivery) {
            $offer = $freeDelivery->offer()
                ->where('status', 'active')
                ->whereDate('start_date', '<=', $now)
                ->whereDate('expiry_date', '>=', $now)
                ->first();

            if ($offer) {
                $freeDeliveryOffers[] = $offer;
            }
        }
    
        $response->setAttribute('stock', $stockQuantity);
        $response->setAttribute('upto_sale_offer', $uptoSaleOffers);
        $response->setAttribute('free_delivery_offer', $freeDeliveryOffers);
    
        return response()->json($response);
    }
    public function sizeWisePriceStock(Request $request) {
        // $response      = ProductSize::with(['size'])->where('product_id', $request->product_id)->where('size_id', $request->size_id)->first();
        // $stockQuantity = Stock::where('product_id', $request->product_id)
        //     ->where('size_id', $request->size_id)
        //     ->value('quantity');
        // $response->setAttribute('stock', $stockQuantity);
        // dd($request->all());
        $response = ProductSize::with(['size'])
            ->where('product_id', $request->product_id)
            ->where('size_id', $request->size_id)
            ->first();

        if (!$response) {
            // Handle case where product shade is not found
            return response()->json(['error' => 'Product shade not found'], 404);
        }
    
        $stockQuantity = Stock::where('product_id', $request->product_id)
            ->where('size_id', $request->size_id)
            ->value('quantity');
    
        $now = Carbon::now();
    
        // Check if uptoSale relationship exists and then filter offer
        $uptoSaleOffer = null;
        if ($response->uptoSale) {
            $uptoSaleOffer = $response->uptoSale->offer()
                ->where('status', 'active')
                ->whereDate('start_date', '<=', $now)
                ->whereDate('expiry_date', '>=', $now)
                ->first();
        }
    
        // Check if freeDelivery relationship exists and then filter offer
        $freeDeliveryOffer = null;
        if ($response->freeDelivery) {
            $freeDeliveryOffer = $response->freeDelivery->offer()
                ->where('status', 'active')
                ->whereDate('start_date', '<=', $now)
                ->whereDate('expiry_date', '>=', $now)
                ->first();
        }
    
        $response->setAttribute('stock', $stockQuantity);
        $response->setAttribute('upto_sale_offer', $uptoSaleOffer);
        $response->setAttribute('free_delivery_offer', $freeDeliveryOffer);
        return response()->json($response);
    }

}
