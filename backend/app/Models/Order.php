<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_no',
        'total_quantity',
        'order_note',
        'total_discount_amount',
        'delivery_charge',
        'coupon_code',
        'coupon_discount',
        'sub_total',
        'grand_total',
        'tax_amount',
        'reward_points',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function shipping()
    {
        return $this->hasOne(Shipping::class);
    }
}
