<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController as BaseController;

class CouponController extends BaseController
{
    public function coupon(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'coupon_code' => 'required',
        ]);

        $couponCode = $request->coupon_code;
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $existingCoupon = Coupon::where('coupon_code', $couponCode)->where('status',1)->first();

        if ($existingCoupon) {
            if (Carbon::now()->gt(Carbon::parse($existingCoupon->expire_date))) {
                // Coupon has expired
                return $this->sendError('Coupon Code has expired', '');
            } else {
                // Coupon is valid
                $success['coupon_code']=$existingCoupon->coupon_code;
                $success['amount']=$existingCoupon->amount;
                $success['minimum_expenses']=$existingCoupon->minimum_expenses;
                $success['max_expenses']=$existingCoupon->max_expenses;
                $success['discount_type']=$existingCoupon->discount_type;

                return $this->sendResponse($success, 'Coupon is available.');
            }

        } else {
            // Coupon code is unique
            return $this->sendError('Coupon Code doesn\'nt exist', '');
        }



    }
}
