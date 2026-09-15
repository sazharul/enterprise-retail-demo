<?php

namespace App\Http\Controllers\API;

use App\Models\AddToCart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Session;

class AddToCartController extends BaseController
{
    public function index(){
        if (!Auth::check()) {
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }
        $user = Auth::user();
        $cartData = AddToCart::where('user_id', $user->id)->get();
        return $this->sendResponse($cartData, 'Cart Data');
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id'    => 'required',
            'quantity'      => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if (!Auth::check()) {
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }

        $user = Auth::user();
        // $demoCartData = [
        //     ['product_id' => 10, 'size_id' => 1, 'color_id' => 1, 'shade_id' => 1, 'quantity' => 10],
        //     ['product_id' => 10, 'size_id' => 2, 'color_id' => 1, 'shade_id' => 2, 'quantity' => 20],
        //     ['product_id' => 10, 'size_id' => 3, 'color_id' => 2, 'shade_id' => 2, 'quantity' => 20],
        // ];

        // session(['cart' => $demoCartData]);

        $cartData = session('cart', []);

        try {
            if (!empty($cartData)) {
                foreach ($cartData as $productData) {
                    $addToCart = new AddToCart();

                    $addToCart->user_id = $user->id;
                    $addToCart->product_id = $productData['product_id'];
                    $addToCart->size_id = $productData['size_id'] ?? null;
                    $addToCart->color_id = $productData['color_id'] ?? null;
                    $addToCart->shade_id = $productData['shade_id'] ?? null;
                    $addToCart->quantity = $productData['quantity'];
                    $addToCart->save();
                }
                session()->forget('cart');
            }

            $addToCart = new AddToCart();
            $addToCart->user_id = $user->id;
            $addToCart->product_id = $request->product_id;
            $addToCart->size_id = $request->size_id ?? null;
            $addToCart->color_id = $request->color_id ?? null;
            $addToCart->shade_id = $request->shade_id ?? null;
            $addToCart->quantity = $request->quantity;
            $addToCart->save();

            $success = true;
            $message = 'Add To Cart successfully.';
            return $this->sendResponse($success, $message);
        } catch (\Exception $e) {
            $success = false;
            $message = 'Error storing data.';
            return $this->sendResponse($success, $message);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            if (!Auth::check()) {
                return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
            }

            $user = Auth::user();
            $item = AddToCart::where('id', $id)
                ->where('product_id', $request->product_id)
                ->where('color_id', $request->color_id)

                ->when($request->has('size_id'), function ($query) use ($request) {
                    $query->where('size_id', $request->size_id);
                })
                ->when($request->has('shade_id'), function ($query) use ($request) {
                    $query->where('shade_id', $request->shade_id);
                })
                ->where('user_id', $user->id)
                ->first();

            if (!$item) {
                $success = false;
                $message = 'Item not found in the cart.';
                return $this->sendResponse($success, $message);
            }

            $request->validate([
                'quantity' => 'required|integer|min:1',
            ]);

            $item->quantity = $request->quantity;
            $item->save();

            $success = true;
            $message = 'Quantity updated successfully.';
            return $this->sendResponse($success, $message);

        } catch (\Exception $e) {
            $success = false;
            $message = 'Error updating quantity.';
            return $this->sendResponse($success, $message);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        try {
            if (!Auth::check()) {
                return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
            }

            $user = Auth::user();
            // $item = AddToCart::where('id', $id)
            //     ->where('user_id', $user->id)
            //     ->first();
            $item = AddToCart::where('id', $id)
            ->where('product_id', $request->product_id)
            ->where('color_id', $request->color_id)

            ->when($request->has('size_id'), function ($query) use ($request) {
                $query->where('size_id', $request->size_id);
            })
            ->when($request->has('shade_id'), function ($query) use ($request) {
                $query->where('shade_id', $request->shade_id);
            })
            ->where('user_id', $user->id)
            ->first();


            if (!$item) {
                $success = false;
                $message = 'Item not found in the cart.';
                return $this->sendResponse($success, $message);
            }

            $item->delete();

            $success = true;
            $message = 'Item removed from the cart successfully.';
            return $this->sendResponse($success, $message);

        } catch (\Exception $e) {
            $success = false;
            $message = 'Error removing item from the cart.';
            return $this->sendResponse($success, $message);
        }
    }
}
