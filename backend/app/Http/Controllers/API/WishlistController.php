<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class WishlistController extends BaseController
{

    public function get_wishlist()
    {

        $user = Auth::user();
        $wishlists = Wishlist::where('user_id',$user->id)->get();

        foreach($wishlists as $wishlist)
        {
            // dd($wishlist->products);
            $product = Product::where('id', $wishlist->product_id)
            ->where('status', 1)->firstOrFail();


            $product_info['name'] = $product->name;
            $product_info['image'] = $product->image;
            $product_info['price'] = $product->price;
            $product_info['discount_price'] = $product->discount_price;
            $product_info['brand_id'] = $product->brand_id;
            $product_info['category_id'] = $product->category_id;

            if(isset($product->brand))
            {$product_info['brand_name'] = $product->brand->name;}
            else
            {
                $product_info['brand_name'] = null;
            }
            if(isset($product->category))
            {$product_info['category_name'] = $product->category->name;}
            else
            {
                $product_info['category_name'] = null;
            }

            $wishlist['product_details'] = $product_info;

        }
        // $success['wishlists'] = $wishlists;

        return $this->sendResponse($wishlists, 'Wishlists Retrived for the User');
    }

    public function addToWishlist(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'product_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = Auth::user();

        if (!$request->product_id) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $existingProduct = Product::find($request->product_id);
        if (!$existingProduct) {
            return $this->sendError('Product ID Desn\'t exist', '');
        }



        $wishlistItem = Wishlist::where('user_id', $user->id)
            ->where('product_id', $request['product_id'])
            ->first();

        if($wishlistItem) {
            // If the item exists, remove it from the wishlist
            $wishlistItem->delete();
            $success['product_id']=$request->product_id;
            return $this->sendResponse($success, 'Product removed from wishlist!.');
        }

        // If not, add the product to the wishlist
        Wishlist::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
        ]);

        $success['product_id']=$request->product_id;


        return $this->sendResponse($success, 'Product added to wishlist!.');
    }
}
