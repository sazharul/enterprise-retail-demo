<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\PurchaseDetails;
use App\Models\Shade;
use App\Models\Size;
use App\Models\Stock;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $keyword = $request->get('search');
        $perPage = 15;

        if (!empty($keyword)) {
            $purchases = Purchase::where('purchase_no', 'LIKE', "%$keyword%")
                ->orWhere('note', 'LIKE', "%$keyword%")
                ->orWhereHas('admin', function ($query) use ($keyword) {
                    $query->where('name', 'LIKE', "%$keyword%");
                })
                ->orderBy('id', 'desc')->paginate($perPage);
        } else {
            $purchases = Purchase::orderBy('id', 'desc')->paginate($perPage);
        }

        return view('purchase.index', compact('purchases'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $chunkSize = 100;
        $products = [];

        Product::where('status', 1)->select('id', 'name', 'price', 'size_id', 'discount_amount', 'discount_percent', 'discount_price')->chunk($chunkSize, function ($chunkProducts) use (&$products) {
            $products = array_merge($products, $chunkProducts->toArray());
        });

        return view('purchase.create', compact('products'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'purchase_no' => 'required|unique:purchases',
                'tax' => 'numeric',
                'vat' => 'numeric',
                'variant_id.*' => 'required',
                'total_discount' => 'numeric',
                'total_quantity' => 'numeric',
                'documents.*' => 'mimes:pdf,jpg,png|max:10240',
            ]);

            $purchase = new Purchase();
            $purchase->purchase_no = $request->purchase_no;
            $purchase->tax = $request->tax;
            $purchase->vat = $request->vat;
            $purchase->total_discount = $request->total_discount;
            $purchase->total_quantity = $request->total_quantity;
            $purchase->total_amount = $request->total_amount;
            $purchase->grand_total_amount = $request->grand_total_amount;
            $purchase->note = $request->note;
            $purchase->purchase_by = Auth::guard('admin')->user()->id;

            if ($request->hasFile('documents')) {
                $documents = [];
                foreach ($request->file('documents') as $document) {
                    $filename = time() . rand(10, 1000) . '.' . $document->extension();
                    $document->move(public_path('upload/purchase_documents'), $filename);
                    $path = 'upload/purchase_documents/' . $filename;
                    $documents[] = $path;
                }
                $purchase->documents = json_encode($documents);
            }
            $purchase->save();

            $product_id = $request->product_id;
            
            for ($i = 0, $n = count($product_id); $i < $n; $i++) {
                $purchaseDetails = new PurchaseDetails();
                $purchaseDetails->purchase_id      = $purchase->id;
                $purchaseDetails->product_id       = $request->product_id[$i];
                $purchaseDetails->product_name       = $request->product_name[$i];
                $purchaseDetails->quantity         = $request->quantity[$i];
                $purchaseDetails->rate             = $request->rate[$i];
                $purchaseDetails->variant_type             = $request->variant_type[$i];

                if ($request->variant_type[$i] == 'shade') {
                    $purchaseDetails->shade_id = $request->variant_id[$i];
                    $purchaseDetails->size_id = null;
                } else {
                    $purchaseDetails->size_id = $request->variant_id[$i];
                    $purchaseDetails->shade_id = null;
                }

                
                // $purchaseDetails->size_id      = $request->size_id[$i] ?? null;
                // $purchaseDetails->shade_id      = $request->shade_id[$i] ?? null;

                $purchaseDetails->discount_amount = $request->discount_amount[$i] ?? 0.00;
                $purchaseDetails->save();

                $warehouse = Warehouse::where('default', 1)->first();
                $productId = $request->product_id[$i];
                $shadeId = null;
                $sizeId = null;

                if ($request->variant_type[$i] == 'shade') {
                    $shadeId += $request->variant_id[$i];
                    $purchaseDetails->size_id = null;
                } else {
                   $sizeId += $request->variant_id[$i];
                    $purchaseDetails->shade_id = null;
                }

                $existingStock = Stock::where('warehouse_id', $warehouse->id)
                    ->where('product_id', $purchaseDetails->product_id)
                    ->where(function ($query) use ($shadeId) {
                        $query->where('shade_id', $shadeId)
                            ->orWhereNull('shade_id');
                    })
                    ->where(function ($query) use ($sizeId) {
                        $query->where('size_id', $sizeId)
                            ->orWhereNull('size_id');
                    })
                    ->first();
             
                if ($existingStock) {
                    $existingStock->quantity += $request->quantity[$i];
                    $existingStock->save();
                } else {
                    $stock = new Stock();
                    $stock->warehouse_id = $warehouse->id;
                    $stock->product_id = $productId;
                    $stock->shade_id = $shadeId;
                    $stock->size_id = $sizeId;
                    $stock->quantity = $request->quantity[$i];
                    $stock->save();
                }
            }
        DB::commit();
        return redirect()->route('purchase.index')->with('success', 'Purchase Created Successfully..!!');
        } catch (\Exception$e) {
            DB::rollback();
            return $e;
            return redirect()->back()->with('fail', 'Date Server Error');
        }
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
        $purchase = Purchase::with(['purchaseDetails'])->find($id);
        
        $purchaseDocuments = json_decode($purchase->documents);
        $chunkSize = 100;
        $products = [];

        Product::where('status', 1)->select('id', 'name', 'price', 'size_id', 'discount_amount', 'discount_percent', 'discount_price')->chunk($chunkSize, function ($chunkProducts) use (&$products) {
            $products = array_merge($products, $chunkProducts->toArray());
        });
        
        return view('purchase.edit', compact('purchase', 'purchaseDocuments', 'products'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'tax' => 'numeric',
                'vat' => 'numeric',
                'total_discount' => 'numeric',
                'total_quantity' => 'numeric',
                'documents.*' => 'mimes:pdf,jpg,png|max:10240',
            ]);

            $purchase = Purchase::with(['purchaseDetails'])->find($id);
            $purchase->tax = $request->tax;
            $purchase->vat = $request->vat;
            $purchase->total_discount = $request->total_discount;
            $purchase->total_quantity = $request->total_quantity;
            $purchase->total_amount = $request->total_amount ?? 0;
            $purchase->grand_total_amount = $request->grand_total_amount;
            $purchase->note = $request->note;
            $purchase->purchase_by = Auth::guard('admin')->user()->id;

            if ($request->hasFile('documents')) {
                $documents = [];
                foreach ($request->file('documents') as $document) {
                    $filename = time() . rand(10, 1000) . '.' . $document->extension();
                    $document->move(public_path('upload/purchase_documents'), $filename);
                    $path = 'upload/purchase_documents/' . $filename;
                    $documents[] = $path;
                }
                $purchase->documents = json_encode($documents);
            }
            $purchase->save();
            
            $warehouse = Warehouse::where('default', 1)->first();

            // Delete all related PurchaseDetails and update stock
            foreach ($purchase->purchaseDetails as $purchaseDetail) {
                // $existingStock = Stock::where([
                //     'warehouse_id' => $warehouse->id,
                //     'product_id' => $purchaseDetail->product_id,
                //     'shade_id' => $purchaseDetail->shade_id,
                //     'size_id' => $purchaseDetail->size_id,
                // ])->first();

                $shadeId = $purchaseDetail->shade_id;
                $sizeId = $purchaseDetail->size_id;


                if ($purchaseDetail->variant_type == 'shade') {
                    $shadeId += $purchaseDetail->variant_id;
                    $purchaseDetail->size_id = null;
                } else {
                   $sizeId += $purchaseDetail->variant_id;
                    $purchaseDetail->shade_id = null;
                }

                
                $existingStock = Stock::where('warehouse_id', $warehouse->id)
                    ->where('product_id', $purchaseDetail->product_id)

                    ->where(function ($query) use ($shadeId) {
                        $query->where('shade_id', $shadeId)
                            ->orWhereNull('shade_id');
                    })
                    ->where(function ($query) use ($sizeId) {
                        $query->where('size_id', $sizeId)
                            ->orWhereNull('size_id');
                    })
                    ->first();

                
                if ($existingStock) {
                    // Decrease existing stock quantity by the purchase detail quantity
                    $existingStock->quantity -= $purchaseDetail->quantity;
                    $existingStock->save();
                }

                $purchaseDetail->delete();
            }


            $product_id = $request->product_id;
            for ($i = 0, $n = count($product_id); $i < $n; $i++) {
                $purchaseDetails = new PurchaseDetails();
                $purchaseDetails->purchase_id      = $purchase->id;
                $purchaseDetails->product_id       = $request->product_id[$i];
                $purchaseDetails->product_name       = $request->product_name[$i];
                $purchaseDetails->quantity         = $request->quantity[$i];
                $purchaseDetails->rate             = $request->rate[$i];
                // $purchaseDetails->size_id      = $request->size_id[$i] ?? null;
                // $purchaseDetails->shade_id      = $request->shade_id[$i] ?? null;

                $purchaseDetails->variant_type             = $request->variant_type[$i];

                if ($request->variant_type[$i] == 'shade') {
                    $purchaseDetails->shade_id = $request->variant_id[$i];
                    $purchaseDetails->size_id = null;
                } else {
                    $purchaseDetails->size_id = $request->variant_id[$i];
                    $purchaseDetails->shade_id = null;
                }


                $purchaseDetails->discount_amount = $request->discount_amount[$i] ?? 0.00;
                $purchaseDetails->save();
             
                // $existingStock = Stock::where([
                //     'warehouse_id' => $warehouse->id,
                //     'product_id' => $request->product_id[$i],
                //     'shade_id' => $request->shade_id[$i],
                //     'size_id' => $request->size_id[$i],
                // ])->first();

                // $existingStock = Stock::where('warehouse_id', $warehouse->id)
                // ->where('product_id', $request->product_id[$i])
                // ->where(function ($query) use ($request, $i) {
                //     $query->where('shade_id', $request->shade_id[$i])
                //           ->orWhereNull('shade_id');
                // })
                // ->where(function ($query) use ($request, $i) {
                //     $query->where('size_id', $request->size_id[$i])
                //           ->orWhereNull('size_id');
                // })
                // ->first();

                $shadeId = null;
                $sizeId = null;

                if ($request->variant_type[$i] == 'shade') {
                    $shadeId += $request->variant_id[$i];
                    $purchaseDetails->size_id = null;
                } else {
                   $sizeId += $request->variant_id[$i];
                    $purchaseDetails->shade_id = null;
                }

                $existingStock = Stock::where('warehouse_id', $warehouse->id)
                    ->where('product_id', $purchaseDetails->product_id)
                    ->where(function ($query) use ($shadeId) {
                        $query->where('shade_id', $shadeId)
                            ->orWhereNull('shade_id');
                    })
                    ->where(function ($query) use ($sizeId) {
                        $query->where('size_id', $sizeId)
                            ->orWhereNull('size_id');
                    })
                    ->first();
             
                if ($existingStock) {
                    $existingStock->quantity += $request->quantity[$i];
                    $existingStock->save();
                } else {
                    $stock = new Stock();
                    $stock->warehouse_id = $warehouse->id;
                    $stock->product_id = $request->product_id[$i];
                    $stock->shade_id = $shadeId;
                    $stock->size_id = $sizeId;
                    $stock->quantity = $request->quantity[$i];
                    $stock->save();
                }
            }
        DB::commit();
        return redirect()->route('purchase.index')->with('success', 'Purchase Created Successfully..!!');
        } catch (\Exception$e) {
            DB::rollback();
            return $e;
            return redirect()->back()->with('fail', 'Date Server Error');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    
    public function deletePurchaseDocument(Request $request)
    {
        $purchase = Purchase::find($request->purchase_id);

        if ($purchase) {
            $purchaseDocuments = json_decode($purchase->documents, true); // Decode as an associative array

            if ($purchaseDocuments && isset($purchaseDocuments[$request->image_key])) {
                
                if (File::exists(public_path($purchaseDocuments[$request->image_key]))) {
                    File::delete(public_path($purchaseDocuments[$request->image_key]));
                }
                unset($purchaseDocuments[$request->image_key]);

                $purchase->documents = json_encode($purchaseDocuments);
                $purchase->save();

                return response()->json(['success' => true, 'message' => 'Image deleted successfully']);
            }
            return response()->json(['error' => 'Image not found'], 404);
        }
        return response()->json(['error' => 'Purchase not found'], 404);
    }

}
