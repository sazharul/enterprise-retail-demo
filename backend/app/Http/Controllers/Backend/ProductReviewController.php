<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\ProductReview;
use Illuminate\Http\Request;

class ProductReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $review = ProductReview::where('title', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $review = ProductReview::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('product-review.index', compact('review'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $review = ProductReview::findOrFail($id);

        return view('product-review.show', compact('review'));

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $review = ProductReview::findOrFail($id);

        return view('product-review.edit', compact('review'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:0,1,2,3,4',
        ]);

        $review = ProductReview::findOrFail($id);

        if ($review->status != $validatedData['status']) {
            $review->update(['status' => $validatedData['status']]);
            return redirect('product-review')->with('flash_message', 'Status updated successfully.');
        }

        return redirect()->back()->with('flash_message', 'Status not updated. No changes detected.');
    }


    public function approve($id)
    {
        $review = ProductReview::findOrFail($id);
        $review->status = 2;
        $review->save();

        return redirect()->route('product-review.index')->with('success', 'Review approved successfully.');
    }

    public function cancel($id)
    {
        $review = ProductReview::findOrFail($id);
        $review->status = 3;
        $review->save();
        return redirect()->route('product-review.index')->with('success', 'Review cancelled successfully.');
    }
    public function pendingReview(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        // Use query builder to get paginated results
        $reviews = ProductReview::where('status', 0)
            ->orderBy('id', 'asc');

        if (!empty($keyword)) {
            $reviews->where('id', 'LIKE', "%$keyword%");
        }

        $review = $reviews->paginate($perPage);

        return view('product-review.pending', compact('review'));
    }
    public function approveReview(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        // Use query builder to get paginated results
        $reviews = ProductReview::where('status', 1)
            ->orderBy('id', 'asc');

        if (!empty($keyword)) {
            $reviews->where('id', 'LIKE', "%$keyword%");
        }

        $review = $reviews->paginate($perPage);

        return view('product-review.approve', compact('review'));

    }
    public function cancelReview(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        // Use query builder to get paginated results
        $reviews = ProductReview::where('status', 2)
            ->orderBy('id', 'asc');

        if (!empty($keyword)) {
            $reviews->where('id', 'LIKE', "%$keyword%");
        }

        $review = $reviews->paginate($perPage);

        return view('product-review.cancel', compact('review'));

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        ProductReview::destroy($id);

        return redirect('product-review')->with('flash_message', 'Product deleted!');
    }
}
