<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddToCart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'size_id',
        'color_id',
        'shade_id',
        'quantity',
    ];
}
