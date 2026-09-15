<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
    use HasFactory;

    protected $fillable = [
        'size_id',
        'product_id',
        'size_price',
    ];

    public function size(){
        return $this->belongsTo(Size::class, 'size_id');
    }

    public function productSizeImages()
    {
        return $this->hasMany(ProductSizeImage::class);
    }

    public function uptoSale(){
        return $this->hasMany(OfferUpToSale::class,'product_size_id');
    }

}
