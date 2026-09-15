<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSizeImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_size_id',
        'size_id',
        'product_id',
        'product_size_image',
    ];
}
