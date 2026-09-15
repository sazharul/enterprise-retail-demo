<?php

namespace App\Http\Controllers\Backend;

use App\Models\Size;
use App\Models\Color;
use App\Models\Shade;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\ProductShadeImage;
use App\Http\Controllers\Controller;
use App\Models\ProductImage;
use Illuminate\Pagination\LengthAwarePaginator;
use RealRashid\SweetAlert\Facades\Alert;


class ProductBulkEditController extends Controller
{
    public function ProductBulkEdit()
    {

    $pro = [];
    $productinfo = ProductShadeImage::latest()->get();

    foreach($productinfo as $product)
    {
        $pro[]= $product->product_image->product->id;
    }
    $pro = array_unique($pro);
    $products = Product::select('id','name')->whereIn('id',$pro)->get();


        // dd($products);

        return view('product-bulk-edit.index', compact('products'));

    }

    public function ProductBulkEditbackup()
    {

        $products = Product::latest()->Where('status', "1")->paginate(15);
        return view('product-bulk-edit.index', compact('products'));
    }


    public function updatePrice($id, Request $request)
    {
        $psi = ProductShadeImage::FindorFail($id);
        $psi->shade_price = $request->input('price');
        $psi->save();
        // dd($psi);
        // Alert::success('Success', 'Price Updated');
        return response()->json(['success' => true]);
    }

    public function getSizes(Product $product)
    {
        $sizes = json_decode($product->size_id);
        $optionsHtml = '<option value="">Select</option>';
        if ($sizes) {
            foreach ($sizes as $size) {
                $sizeObj = Size::findOrFail($size);
                $optionsHtml .= "<option value=\"{$sizeObj->id}\">{$sizeObj->name}</option>";
            }
        }
        // dd($optionsHtml);
        return $optionsHtml;
    }

    public function getColors(Product $product)
    {
        $colors = json_decode($product->color_id);
        $optionsHtml = '<option value="">Select</option>';
        if ($colors) {
            foreach ($colors as $color) {
                $colorObj = Color::findOrFail($color);
                $optionsHtml .= "<option value=\"{$colorObj->id}\">{$colorObj->name}</option>";
            }
        }
        return $optionsHtml;
    }

    public function getShades(Color $color)
    {
        $shades = $color->shades;
        $optionsHtml = '<option value="">Select</option>';
        foreach ($shades as $shade) {
            $optionsHtml .= "<option value=\"{$shade->id}\">{$shade->name}</option>";
        }
        return $optionsHtml;
    }

    public function getTableContent(Request $request)
    {
        $productId = $request->input('product_id');
        $sizeId = $request->input('size_id');
        $colorId = $request->input('color_id');
        $shadeId = $request->input('shade_id');
        // dd($productId);
        $products = ProductShadeImage::latest()
            ->whereHas('product_image.product', function ($subQuery) use ($sizeId, $colorId, $productId) {
                $subQuery->where('status', 1);
                if (isset($sizeId)) {
                    $subQuery->whereJsonContains('size_id', $sizeId);
                }
                if ($productId) {
                    $subQuery->where('product_id', $productId);
                }

                if ($colorId) {
                    $subQuery->whereJsonContains('color_id', $colorId);
                }
            })
            ->where(function ($subQuery) use ($shadeId) {
                if ($shadeId) {
                    $subQuery->where('shade_id', $shadeId);
                }
            })->get();
        $perPage = 10;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $currentItems = $products->slice(($currentPage - 1) * $perPage, $perPage)->all();
        $paginator = new LengthAwarePaginator($currentItems, count($products), $perPage, $currentPage);

        foreach ($products as $product) {
            $product['name'] = $product->product_image->product->name;
            isset($product->product_image->product->size_id) ? $product['size_id'] = $product->product_image->product->size_id : " ";
            isset($product->shade->color) ? $product['color'] = $product->shade->color->name : " ";
        }
        // dd($products);

        return response()->json(['products' => $products, 'pagination' => $paginator]);

    }
}
