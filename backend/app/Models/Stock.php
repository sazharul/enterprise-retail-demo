<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $fillable = [
        'warehouse_id',
        'product_id',
        'shade_id',
        'size_id',
        'quantity',
    ];

    public static function stockCheck($productId, $shadeId, $sizeId)
    {
        $warehouseId = Warehouse::where('default', 1)->value('id');
        $existingStock = self::where('warehouse_id', $warehouseId)
            ->where('product_id', $productId)
            ->where(function ($query) use ($shadeId) {
                $query->where('shade_id', $shadeId)
                    ->orWhereNull('shade_id');
            })
            ->where(function ($query) use ($sizeId) {
                $query->where('size_id', $sizeId)
                    ->orWhereNull('size_id');
            })
            ->first();
            
        return $existingStock;
    }
    
    public static function increaseStock($productId, $shadeId, $sizeId, $quantity)
    {
        $warehouseId = Warehouse::where('default', 1)->value('id');
        $existingStock = self::where('warehouse_id', $warehouseId)
            ->where('product_id', $productId)
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
            $existingStock->quantity += $quantity;
            $existingStock->save();
        } else {
            $stock = new self();
            $stock->warehouse_id = $warehouseId;
            $stock->product_id = $productId;
            $stock->shade_id = $shadeId;
            $stock->size_id = $sizeId;
            $stock->quantity = $quantity;
            $stock->save();
        }
    }

    public static function decreaseStock($productId, $shadeId, $sizeId, $quantity)
    {
        $warehouseId = Warehouse::where('default', 1)->value('id');
        $existingStock = self::where('warehouse_id', $warehouseId)
            ->where('product_id', $productId)
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
            // Decrease existing stock quantity by the specified quantity
            $existingStock->quantity -= $quantity;
            $existingStock->save();
        }
    }
}
