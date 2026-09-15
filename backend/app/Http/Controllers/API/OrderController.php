<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Coupon;
use App\Models\Product;
use App\Models\Shipping;
use App\Models\OrderDetail;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\ComboProduct;
use App\Models\ComboProductInfo;
use App\Models\OfferCombo;
use App\Models\OfferUpToSale;
use App\Models\ProductShade;
use App\Models\ProductSize;
use App\Models\Reward;
use App\Models\RewardHistory;
use App\Models\RewardSetup;
use App\Models\Shade;
use App\Models\Size;
use App\Models\Stock;
use App\Models\User;
use Illuminate\Support\Collection;
use DateTime;

class OrderController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function orderStore(Request $request)
    {
        // dd($request->order_details);
        $orderDetails = json_decode($request->order_details);
        $validator = Validator::make($request->all(), [
            'order_details' => 'required',
            'billing_shipping_details' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', ['error'=>'Validation Error'], 422);
        }

        
        try {
            DB::beginTransaction();

            // Get data from frontend
            $orderDetails = json_decode($request->order_details);
   
            $combo_product_ids = collect($orderDetails)
                ->where('is_combo', 1)
                ->pluck('product_id')
                ->toArray();

            $product_ids = collect($orderDetails)
                ->where('is_combo', 0)
                ->pluck('product_id')
                ->toArray();
            
            $currentDate = now();
            
            // match data from database && Find Product list
            $product_list = Product::whereIn('id', $product_ids)
            ->select('id', 'name', 'image', 'discount_amount', 'discount_percent', 'discount_price', 'variation_type', 'is_combo', 'is_free_delivery')
            ->get()->toArray();


            // match data from database && Find Combo Product list
            $combo_product_list = ComboProduct::with(['offerCombo.offer', 'comboProductDetails.comboProductInfos'])
            ->whereIn('id', $combo_product_ids)
            ->whereHas('offerCombo', function ($query) {
                $query->whereNotNull('offer_id');
            })->get()->toArray();
            
            // dd($combo_product_list);
            
            // Get delivery charge
            // $delivery_charge_get = DeliveryCharge::first();
            $eligible_delivery_free = false; // Flag to track if delivery charge should be included
            $delivery_charge = 60;
            // $delivery_charge = $delivery_charge_get->first_cost;
       
            
            // Set total weight && set OrderDetailsInfo && ProductDiscount
            $orderDetailsInfo = [];
            $sub_total = 0;
            $discount_price = 0;
            $totalQuantity = 0;

            // Convert the array of stdClass objects to a collection
            $orderDetailsCollection = collect($orderDetails);
            $productIds = $orderDetailsCollection->pluck('product_id')->toArray();

            $shadePrices = ProductShade::whereIn('product_id', $productIds)
                ->whereIn('shade_id', $orderDetailsCollection->pluck('shade_id')->filter())
                ->pluck('shade_price', 'product_id');

            $sizePrices = ProductSize::whereIn('product_id', $productIds)
                ->whereIn('size_id', $orderDetailsCollection->pluck('size_id')->filter())
                ->pluck('size_price', 'product_id');

            $subTotal = 0;
            $shadeSubtotal = $orderDetailsCollection->filter(function ($item) {
                return $item->shade_id !== null;
            })->sum(function ($item) use ($shadePrices) {
                return count($shadePrices) === 0 ? 0 : $shadePrices[$item->product_id] * $item->quantity;
            });
                
            $sizeSubtotal = $orderDetailsCollection->filter(function ($item) {
                return $item->size_id !== null;
            })->sum(function ($item) use ($sizePrices) {
                return count($sizePrices) === 0 ? 0 : $sizePrices[$item->product_id] * $item->quantity;
            });

            $subTotal = $sizeSubtotal + $shadeSubtotal;
            
            // dd($orderDetails);
            foreach ($orderDetails as $item) {

                if ($item->is_combo == 0) {

                    // Check stock availability
                    $stockAvailable = Stock::stockCheck($item->product_id, $item->shade_id, $item->size_id);
                    if ($stockAvailable && $stockAvailable->quantity > 0 && $stockAvailable->quantity >= $item->quantity ) {

                        $discount_price_item = 0;
                        $find_product = Arr::first($product_list, function ($query) use ($item) {
                            return $query['id'] == $item->product_id;
                        });

                        if (isset($find_product)) {
                            $productId = $find_product['id'];
                            $sizeId = $item->size_id;
                            $shadeId = $item->shade_id;
        
                            $shadePrice = 0;
                            $sizePrice = 0;
        
                            if ($shadeId !== null) {
                                $shadeInfo = ProductShade::with(['shade'])->where('shade_id', $shadeId)->where('product_id', $find_product['id'])->first();
                                
                                $shadePrice = $shadeInfo->shade_price ?? 0;
                                $sub_total += $shadePrice * $item->quantity;
                                $newObject['shade'] = $shadeInfo->shade?->name ?? null;
                                $newObject['size'] = null;
                                $newObject['price'] = $shadePrice;
        
                                //Discount Calculate
                                $discount_price_item = $shadePrice * $find_product['discount_percent'] / 100;
                                $newObject['discount'] = $discount_price_item;
                                $discount_price += $discount_price_item * $item->quantity;
                                $newObject['discount_type'] = "Product Discount";
                            }
                            
                            if ($sizeId !== null) {
                                $sizeInfo = ProductSize::with(['size'])->where('size_id', $sizeId)->where('product_id', $find_product['id'])->first();
                            
                                $sizePrice = $sizeInfo->size_price ?? 0;
                                $sub_total += $sizePrice * $item->quantity;
                                
                                $newObject['size'] = $sizeInfo->size?->name ?? null;
                                $newObject['shade'] = null;
                                $newObject['price'] = $sizePrice;
        
                                //Discount Calculate
                                $discount_price_item = $sizePrice * $find_product['discount_percent'] / 100;
                                $newObject['discount'] = $discount_price_item;
                                $discount_price += $discount_price_item * $item->quantity;
                                $newObject['discount_type'] = "Product Discount";
                            }
                            
                            $newObject['product_id'] = $find_product['id'];
                            $newObject['combo_product_id'] = null;
                            $newObject['product_name'] = $find_product['name'];
                            $newObject['size_id'] = $item->size_id;
                            $newObject['shade_id'] = $item->shade_id;
                            $newObject['product_image'] = $find_product['image'];
                            $newObject['quantity'] = $item->quantity;
                            $totalQuantity += $item->quantity;

                            if ($find_product && $find_product['is_free_delivery'] == 1) {
                                $eligible_delivery_free = true;
                            }
        
                            $offerUpToSaleExist = OfferUpToSale::with(['productShades.shade', 'productSizes.size', 'offer'])
                            ->where('product_id', $find_product['id'])
                            ->where(function ($query) use ($shadeId, $sizeId) {
                                $query->whereHas('productShades', function ($query) use ($shadeId) {
                                        $query->where('shade_id', $shadeId);
                                    })
                                    ->orWhereHas('productSizes', function ($query) use ($sizeId) {
                                        $query->where('size_id', $sizeId);
                                    });
                            })->get();
        
                            $offerId = [];
                            $offerName = [];
                            $offerDiscount = [];
        
                            foreach ($offerUpToSaleExist as $key => $value) {
                        
                                $offerStartDate = new DateTime($value->offer->start_date);
                                $offerExpiryDate = new DateTime($value->offer->expiry_date);
                                $offerExpiryDate->modify('+1 day')->modify('midnight');
        
                                $minAmount = $value->min_amount;
        
                                if ($currentDate >= $offerStartDate && $currentDate < $offerExpiryDate) {
        
                                    if ($subTotal >= $minAmount) {
                                        $discount_price += $value->flat_discount;
                            
                                        array_push($offerId, $value->offer->id);
                                        array_push($offerName, $value->offer->name);
                                        array_push($offerDiscount, $value->flat_discount);
                                        
                                        if ($value && $value->offer->is_free_delivery == 1) {
                                            $eligible_delivery_free = true;
                                        }
                                    }
                                }
                            };

                            $newObject['offer_id'] = json_encode($offerId) ;
                            $newObject['offer_name'] = json_encode($offerName);
                            $newObject['offer_discount'] =  json_encode($offerDiscount);
                            $newObject['offer_type'] =  'Up To Sale';
                            
                            $orderDetailsInfo[] = $newObject;
        
                            // Product Stock Adjust
                            Stock::decreaseStock($productId, $shadeId, $sizeId, $item->quantity);

                        }
                    }else{
                        return $this->sendResponse('message', 'Stock not available for product.');
                    }
                }else{
                    if(!empty($combo_product_list)){
                        $find_combo_product = Arr::first($combo_product_list, function ($query) use ($item) {
                            return $query['id'] == $item->product_id;
                        });
                        
                        $combo_product_infos = ComboProductInfo::where('combo_product_id', $find_combo_product['id'])->get()->toArray();
                        
                        
                        if($item->is_optional == 0){
                            
                            $productIDS = collect($find_combo_product['combo_product_details'])->pluck('product_id')->toArray();
                            $productInfos = Product::whereIn('id', $productIDS)->select('name', 'image')->get()->toArray();
        
                            // echo '<pre>';
                            // print_r($combo_product_infos);
                            foreach ($combo_product_infos as $key => $combo_product_info) {

                                $stockAvailable = Stock::stockCheck($combo_product_info['product_id'], $combo_product_info['shade_id'], $combo_product_info['size_id']);

                                if ($stockAvailable && $stockAvailable->quantity > 0 && $stockAvailable->quantity >= $item->quantity * $combo_product_info['quantity']) {
                                    
                                    $combo_discount_price = 0;
                                    if (isset($find_combo_product)) {
                                        $productId = $combo_product_info['product_id'];
                                        $sizeId = $combo_product_info['size_id'];
                                        $shadeId = $combo_product_info['shade_id'];
    
    
                                        $sub_total += $combo_product_info['actual_price'];
                                        $newObject['price'] = $combo_product_info['price'];
                                    
                                        $newObject['discount_type'] = "Combo Product Discount";
                    
                                        $newObject['product_id'] = $combo_product_info['product_id'];
                                        $newObject['combo_product_id'] = $find_combo_product['id'] ?? null;
                                        $newObject['product_name'] = $productInfos[$key]['name'];
                                        $newObject['size_id'] = $combo_product_info['size_id'] ?? null;;
                                        $newObject['shade_id'] = $combo_product_info['shade_id'] ?? null;
                                        $newObject['shade'] = null;
                                        $newObject['size'] = null;
                                        $newObject['product_image'] = $productInfos[$key]['image'];
                                        $newObject['quantity'] = $combo_product_info['quantity'];
                                        $totalQuantity += $combo_product_info['quantity'];
            
                                        $offerCombos = $find_combo_product['offer_combo'];
                                        $offerId = [];
                                        $offerName = [];
                                        $offerDiscount = [];
                                        
                                    
                                        foreach ($offerCombos as $key => $value) {
                                            
                                            $offerStartDate = new DateTime($value['offer']['start_date']);
                                            $offerExpiryDate = new DateTime($value['offer']['expiry_date']);
                                            $offerExpiryDate->modify('+1 day')->modify('midnight');
                    
                                            $minAmount = $value['offer']['min_amount'];
                    
                                            if ($currentDate >= $offerStartDate && $currentDate < $offerExpiryDate) {
                    
                                                if ($subTotal >= $minAmount) {
                                                    
                                                    $discount_price += $combo_product_info['actual_price'] - $combo_product_info['price'] ?? 0;
                                                    $combo_discount_price += $combo_product_info['actual_price'] - $combo_product_info['price'] ?? 0;
                                        
                                                    array_push($offerId, $value['offer']['id']);
                                                    array_push($offerName, $value['offer']['name']);
                                                    array_push($offerDiscount, $combo_product_info['actual_price'] - $combo_product_info['price'] ?? 0);
                                                    
                                                    if ($value && $value['offer']['is_free_delivery'] == 1) {
                                                        $eligible_delivery_free = true;
                                                    }
                                                }
                                            }
                                        };
                                        $newObject['discount'] = $combo_discount_price ?? 0;
                                        $newObject['offer_id'] = json_encode($offerId) ;
                                        $newObject['offer_name'] = json_encode($offerName);
                                        $newObject['offer_discount'] =  json_encode($offerDiscount);
                                        $newObject['offer_type'] =  'Combo Offer';
                                        $orderDetailsInfo[] = $newObject;
                    
                                        // Product qty adjust
                                        Stock::decreaseStock($productId, $shadeId, $sizeId, $combo_product_info['quantity']);
                                    }  
                                }else{
                                    return $this->sendResponse('message', 'Stock not available for product.');
                                }
                                
                            }
                        }else{
                            
                            if(!empty($item->optional_details)){
                                
                                $comboProductId = $item->product_id;
                                foreach ($item->optional_details as $optional_detail) {
                                    $product_id = $optional_detail->product_id;
                                    $shade_id = $optional_detail->shade_id;
                                    $size_id = $optional_detail->size_id;

                                    $comboProductInfo = ComboProductInfo::with(['shade', 'size'])->where('combo_product_id', $comboProductId)->where('product_id', $product_id)
                                        ->when($shade_id !== null, function ($query) use ($shade_id) {
                                            $query->where('shade_id', $shade_id);
                                        })
                                        ->when($size_id !== null, function ($query) use ($size_id) {
                                            $query->where('size_id', $size_id);
                                        })->first();

                                    $combo_discount_price = 0;

                                    $stockAvailable = Stock::stockCheck($product_id, $shade_id, $size_id);
                                    if ( !empty($$comboProductInfo) && $stockAvailable && $stockAvailable->quantity > 0 && $stockAvailable->quantity >= $item->quantity * $comboProductInfo->quantity ?? 0 ) {
                                        if (isset($find_combo_product)) {
                                            $sub_total += $comboProductInfo->actual_price;
                                            $newObject['price'] = $comboProductInfo->price;
                                        
                                            $newObject['discount_type'] = "Combo Product Discount";
                        
                                            $newObject['product_id'] = $comboProductInfo->product_id;
                                            $newObject['combo_product_id'] = $find_combo_product['id'] ?? null;
    
                                            $productName = Product::where('id', $product_id)->select('name', 'image')->first();
    
                                            $newObject['product_name'] = $productName->name;
                                            $newObject['size_id'] = $comboProductInfo->size_id ?? null;;
                                            $newObject['shade_id'] = $comboProductInfo->shade_id ?? null;
                                            $newObject['shade'] = $comboProductInfo->shade?->name ?? null;
                                            $newObject['size'] = $comboProductInfo->size?->name ?? null;
                                            $newObject['product_image'] = $productName->image;
                                            $newObject['quantity'] = $comboProductInfo->quantity;
                                            $totalQuantity += $comboProductInfo->quantity;
                
                                            $offerCombos = $find_combo_product['offer_combo'];
                                            $offerId = [];
                                            $offerName = [];
                                            $offerDiscount = [];
                                            
                                        
                                            foreach ($offerCombos as $value) {
                                                
                                                $offerStartDate = new DateTime($value['offer']['start_date']);
                                                $offerExpiryDate = new DateTime($value['offer']['expiry_date']);
                                                $offerExpiryDate->modify('+1 day')->modify('midnight');
                        
                                                $minAmount = $value['offer']['min_amount'];
                        
                                                if ($currentDate >= $offerStartDate && $currentDate < $offerExpiryDate) {
                        
                                                    if ($subTotal >= $minAmount) {
                                                        
                                                        $discount_price += $comboProductInfo->actual_price - $comboProductInfo->price ?? 0;
                                                        $combo_discount_price += $comboProductInfo->actual_price - $comboProductInfo->price ?? 0;
                                            
                                                        array_push($offerId, $value['offer']['id']);
                                                        array_push($offerName, $value['offer']['name']);
                                                        array_push($offerDiscount, $comboProductInfo->actual_price - $comboProductInfo->price ?? 0);
                                                        
                                                        if ($value && $value['offer']['is_free_delivery'] == 1) {
                                                            $eligible_delivery_free = true;
                                                        }
                                                    }
                                                }
                                            };
                                            $newObject['discount'] = $combo_discount_price ?? 0;
                                            $newObject['offer_id'] = json_encode($offerId) ;
                                            $newObject['offer_name'] = json_encode($offerName);
                                            $newObject['offer_discount'] =  json_encode($offerDiscount);
                                            $newObject['offer_type'] =  'Combo Offer';
    
                                            
                                            $orderDetailsInfo[] = $newObject;
                        
                                            // Product Stock Adjust
                                            Stock::decreaseStock($product_id, $shade_id, $size_id, $comboProductInfo->quantity);
                                        } 
                                    }else{
                                        return $this->sendResponse('message', 'Stock not available for product.');
                                    } 
                                }
                            }else{
                                return $this->sendResponse('message', 'Product not found');
                            }
                        }
                    }else{
                        return $this->sendResponse('message', 'Product not found');
                    }
                }
            }
           
            
           
            // Coupon code price setup
            $coupon = Coupon::where('coupon_code', $request->coupon_code)->where('status', 1)
            ->whereDate('expire_date', '>=', now())->first();
            $coupon_code = '';
            
            $coupon_code_discount = 0;
            if (isset($coupon)) {
                $coupon_code = $request->coupon_code;
                
                if ($coupon->minimum_expenses) {
                    if ($coupon->minimum_expenses <= $sub_total) {
                        if ($coupon->discount_type == 1) {
                            $coupon_code_discount = $sub_total - ($sub_total * $coupon->amount / 100);
                        } else {
                            $coupon_code_discount = $coupon->amount;
                        }
                    }
                } else {
                    if ($coupon->discount_type == 1) {
                        $coupon_code_discount = $sub_total - ($sub_total * $coupon->amount / 100);
                    } else {
                        $coupon_code_discount = $coupon->amount;
                    }
                }
            }
           
             
            // Set Tax Amount
            $tax_amount = 0;
            // $tax_name = '';
            // $tax_get = Tax::where('status', 1)->first();
            // if (isset($tax_get)) {
            //     $tax_amount = $tax_get->tax_rate;
            //     $tax_name = $tax_get->tax_name;
            // }

            if ($eligible_delivery_free) {
                $delivery_charge = 0;
            }

            // Reward point
            $rewardPointAmount = 0;
            $reward = Reward::where('user_id', Auth::id())->first(); 
            $rewardSetup = RewardSetup::first();

            if (isset($reward)) {
                
                if ((int)$request->reward_point > $reward->remaining_point) {
                    return $this->sendResponse('message', 'Reward points not enough in your account. You can only use '.$reward->remaining_point.' points');
                }else{
                    $rewardPointAmount += $rewardSetup->reward_point_value * (int)$request->reward_point;
                    $reward->remaining_point -= (int)$request->reward_point;
                    $reward->save();
                }
            }
            // dd($rewardPointAmount);

            $grand_total = $sub_total + $delivery_charge - $rewardPointAmount - $discount_price - $coupon_code_discount + $tax_amount;
            
            // dd($grand_total);

            $order = Order::create([
                'user_id' => Auth::user()->id,
                'order_no' => $this->generateOrderNumber(),
                'total_quantity' => $totalQuantity,
                'sub_total' => $sub_total,
                'delivery_charge' => $delivery_charge,
                'total_discount_amount' => $discount_price,
                'coupon_code' => $coupon_code,
                'coupon_discount' => $coupon_code_discount,
                'tax_amount' => $tax_amount,
                'grand_total' => $grand_total,
                'reward_points' => $this->calculateRewardPoints($sub_total),
                'order_note' => $request->order_note,
            ]);

             // Calculate reward points earned for this order
            $rewardPointsEarned = $this->calculateRewardPoints($sub_total);
        
            if ($reward) {
                // Update existing reward record
                $reward->total_point += $rewardPointsEarned;
                $reward->remaining_point += $rewardPointsEarned;
                $reward->used_point += (int)$request->reward_point;
                $reward->save();
            } else {
                // Create new reward record for the user
                $reward = Reward::create([
                    'user_id' => Auth::id(),
                    'total_point' => $rewardPointsEarned,
                    'used_point' => (int)$request->reward_point,
                    'remaining_point' => $rewardPointsEarned,
                ]);
            }
            
            // Log reward points earned in reward history
            RewardHistory::create([
                'user_id' => Auth::id(),
                'order_id' => $order->id,
                'using_point' => (int)$request->reward_point,
            ]);
          
           
            // order details data setup
            foreach ($orderDetailsInfo as &$item) {
                $item['order_id'] = $order->id;
            }
            unset($item);
            OrderDetail::insert($orderDetailsInfo);


            // dd($orderDetailsInfo);

            $billing_shipping_info = json_decode($request->billing_shipping_details);

            $shipping = [
                'user_id' => Auth::user()->id,
                'order_id' => $order->id,
                'name' => $billing_shipping_info->name,
                'phone' => $billing_shipping_info->phone,
                'email' => $billing_shipping_info->email,
                'district' => $billing_shipping_info->district,
                'city' => $billing_shipping_info->city,
                'address' => $billing_shipping_info->address,
            ];
            
           
            // create billing info
            Shipping::create($shipping);
           
            // dd('loop');
            DB::commit();

            return $this->sendResponse($order, 'Order Placed successfully.');
        } catch (\Exception $e) {
            // An error occurred, rollback the transaction
            DB::rollBack();

            // Handle the exception or log the error
            return $this->sendError('Order Placement Failed.', $e->getMessage(), 500);
        }
    }

    private function generateOrderNumber() {
        $timestamp = now()->timestamp;
        $randomNumber = mt_rand(1000, 9999);
        $randomString = Str::random(6);
        $orderNumber = $timestamp . $randomNumber . $randomString;
        $orderNumber = substr($orderNumber, 0, 12);
        return $orderNumber;
    }

    
    private function calculateRewardPoints($amount)
       {
           $reward = RewardSetup::first();
           if ($reward && $reward->amount > 0) {
               $rewardPoints = floor($amount / $reward->amount) * $reward->reward_point;
               return $rewardPoints;
           }else {
               return 0;
           }
       }
    public function destroy($orderId)
    {
        $order = Order::where('user_id', Auth::id())->findOrFail($orderId);

        if ($order->status == 1) {
            $order->update(['status' => 5]);
            
            return $this->sendResponse([], 'Order deleted successfully.');
        }else{
            return $this->sendError('Order Deletion Failed. You can only delete which orders are Pending', '');
        }
            
    }

}