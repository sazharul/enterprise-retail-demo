<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductShadeImage extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'shade_id',
    //     'product_id',
    //     'product_image_id',
    //     'shade_price',
    //     'shade_image',
    // ];

    // public function shade(){
    //     return $this->belongsTo(Shade::class);
    // }

    // public function product_image(){
    //     return $this->belongsTo(ProductImage::class);
    // }

    protected $fillable = [
        'product_shade_id',
        'shade_id',
        'product_id',
        'product_shade_image',
    ];
}
