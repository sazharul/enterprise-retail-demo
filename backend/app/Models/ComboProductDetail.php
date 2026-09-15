<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComboProductDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'combo_product_id',
        'product_id'
    ];

    public function comboProductInfos()
    {
        return $this->hasMany(ComboProductInfo::class);
    }
    public function comboProduct(){
        return $this->belongsTo(ComboProduct::class, 'id', 'combo_product_id');
    }

    public function product(){
        return $this->belongsTo(Product::class, 'id', 'product_id');
    }
}
