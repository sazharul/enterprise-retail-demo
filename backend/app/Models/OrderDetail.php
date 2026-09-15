<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'combo_product_id',
        'product_name',
        'product_image',
        'price',
        'discount',
        'quantity',
        'discount_type',
        'offer_id',
        'offer_discount',
        'offer_name',
        'offer_type',
        'shade_id',
        'size_id',
        'offer_id',
        'size',
        'shade',
    ];
}
