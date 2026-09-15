<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_id',
        'product_id',
        'product_name',
        'rate',
        'discount_amount',
        'total_price',
        'variant_type',
        'size_id',
        'shade_id',
        'quantity',
    ];

   
    public function productShades()
    {
        return $this->hasMany(ProductShade::class);
    }
}
