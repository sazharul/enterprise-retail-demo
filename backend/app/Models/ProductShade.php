<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductShade extends Model
{
    use HasFactory;

    protected $fillable = [
        'shade_id',
        'product_id',
        'shade_price',
    ];
    protected $casts = [
        'shade_id' => 'array',
    ];

    public function shade(){
        return $this->belongsTo(Shade::class, 'shade_id');
    }

    public function productShadeImages()
    {
        return $this->hasMany(ProductShadeImage::class);
    }

    public function uptoSale(){
        return $this->hasMany(OfferUpToSale::class,'product_shade_id');
    }

}
