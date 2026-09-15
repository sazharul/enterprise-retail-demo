<?php

namespace App\Http\Controllers\Backend;

use App\Models\Coupon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CouponController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $coupon = Coupon::where('coupon_code', 'LIKE', "%$keyword%")
                ->orWhere('status', 'LIKE', "%$keyword%")
                ->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $coupon = Coupon::orderBy('id', 'asc')->paginate($perPage);
        }

        return view('coupon.index', compact('coupon'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('coupon.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'coupon_code' => 'required',
            'amount' => 'required|numeric',
            'expire_date' => 'required',
        ]);

        if ($validator->fails()) {
            return back()
                ->with('toast_error', $validator->messages()->all())
                ->withInput();
        }

        $requestData = $request->all();
        Coupon::create($requestData);



        return redirect()->route('coupon.index')->with('flash_message', 'Coupon added!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $coupon = Coupon::findOrFail($id);

        return view('coupon.edit', compact('coupon'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'coupon_code' => 'required',
            'amount' => 'required|numeric',
            'expire_date' => 'required',
        ]);

        if ($validator->fails()) {
            return back()
                ->with('toast_error', $validator->messages()->all())
                ->withInput();
        }
        $coupon = Coupon::findOrFail($id);
        $requestData = $request->all();
        $coupon->update($requestData);



        return redirect()->route('coupon.index')->with('flash_message', 'Coupon updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Coupon::destroy($id);

        return redirect()->route('coupon.index')->with('flash_message', 'Coupon deleted!');
    }
}
