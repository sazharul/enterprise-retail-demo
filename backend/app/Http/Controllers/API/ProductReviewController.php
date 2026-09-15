<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\ProductReview;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\ProductReviewImage;
use App\Models\ReviewHelpful;

class ProductReviewController extends BaseController
{

    public function getReview()
    {
        $reviews = ProductReview::with(['productReviewImages','shade', 'size', 'reviewHelpful'])->withCount('reviewHelpful as helpful_count')->get();
        return $this->sendResponse($reviews, 'Review Retrieved');
    }

    public function getReviewAllImages(Request $request){
        $reviewsImages = ProductReviewImage::where('product_id', $request->product_id)->get();
        return $this->sendResponse($reviewsImages, 'Review Images Retrieved');
    }

    public function storeReview(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'title' => 'required|string',
            'order_id' => 'required',
            'star' => 'required|integer|between:1,5',
            'shade_id' => 'nullable',
            'shade_id' => 'nullable',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image'
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if (Auth::check()) {
            $existingReview = ProductReview::with(['productReviewImages'])->where('user_id', Auth::id())
                ->where('product_id', $request->product_id)
                ->when($request->has('size_id'), function ($query) use ($request) {
                    $query->where('size_id', $request->size_id);
                })
                ->when($request->has('shade_id'), function ($query) use ($request) {
                    $query->where('shade_id', $request->shade_id);
                })
                ->first();

            $imagePaths = [];
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imageName = $image->getClientOriginalName();
                    $directory = 'images/product-review/';
                    $image->move($directory, $imageName);
                    $imageUrl = $directory . $imageName;

                    $imagePaths[] = $imageUrl;
                }
            }

            if ($existingReview) {
                $existingReview->update([
                    'title' => $request->title,
                    'comment' => $request->comment ?? null,
                    'star' => $request->star,
                    'shade_id' => $request->shade_id,
                    'size_id' => $request->size_id,
                    'status' => 1,
                ]);

                $existingReview->productReviewImages->each(function ($productReviewImages) {
                    $productReviewImages->delete();
                });

                for ($i=0; $i < count($imagePaths); $i++) {
                    $reviewImage = new ProductReviewImage([
                        'product_review_id' => $existingReview->id,
                        'product_id' => $existingReview->product_id ?? null,
                        'shade_id' => $existingReview->shade_id ?? null,
                        'size_id' => $existingReview->size_id ?? null,
                        'image' => $imagePaths[$i] ?? null,
                    ]);
                    $reviewImage->save();
                }
                return $this->sendResponse($existingReview, 'Review info updated successfully.');
            } else {

                $review = new ProductReview([
                    'user_id' => Auth::id(),
                    'product_id' => $request->product_id,
                    'order_id' => $request->order_id,
                    'title' => $request->title,
                    'comment' => $request->comment ?? null,
                    'star' => $request->star,
                    'shade_id' => $request->shade_id,
                    'size_id' => $request->size_id,
                ]);
                $review->save();

                for ($i=0; $i < count($imagePaths); $i++) {
                    $reviewImage = new ProductReviewImage([
                        'product_review_id' => $review->id,
                        'product_id' => $review->product_id ?? null,
                        'shade_id' => $review->shade_id ?? null,
                        'size_id' => $review->size_id ?? null,
                        'image' => $imagePaths[$i] ?? null,
                    ]);
                    $reviewImage->save();
                }

                return $this->sendResponse($review, 'Review info added successfully.');
            }
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }

    public function storeReviewHelpful(Request $request){
        $validator = Validator::make($request->all(), [
            'product_review_id' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', ['error' => 'Validation Error'], 422);
        }

        $productReview = ProductReview::find($request->product_review_id);

        if ($productReview) {

            $existingHelpful = ReviewHelpful::where('product_review_id', $productReview->id)
                ->where('user_id', $request->user_id)
                ->first();

            if ($existingHelpful) {

                $existingHelpful->helpful == 0 ? $existingHelpful->update(['helpful' => 1]) : $existingHelpful->update(['helpful' => 0]) ;

                return $this->sendSuccess($existingHelpful, 'Helpful Updated successfully.');
            } else {
                $helpful = new ReviewHelpful([
                    'product_review_id' => $productReview->id,
                    'user_id' => $request->user_id,
                    'helpful' => 1,
                ]);
                $helpful->save();

                return $this->sendSuccess($helpful, 'Helpful Stored successfully.');
            }
        } else {
            return $this->sendError('Product Review Not Found.', ['error' => 'Product Review not found.'], 404);
        }
    }
}