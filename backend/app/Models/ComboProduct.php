<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComboProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'original_price',
        'discounted_price',
        'flat_discount',
        'image',
        'images',
        'description',
        'is_optional',
        'is_combo'
    ];

    public function comboProductDetails()
    {
        return $this->hasMany(ComboProductDetail::class);
    }

    public function offerCombo()
    {
        return $this->hasMany(OfferCombo::class,'combo_product_id');
    }

    // public function offerCombo()
    // {
    //     return $this->belongsTo(OfferCombo::class);
    // }

    public function comboProductInfo(){
        return $this->hasManyThrough(ComboProductInfo::class,ComboProductDetail::class,'combo_product_id','id','id','id'
        );
    }
}





