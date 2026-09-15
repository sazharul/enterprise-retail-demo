<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComboProductInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'combo_product_detail_id',
        'combo_product_id',
        'product_id',
        'actual_price',
        'price',
        'size_id',
        'shade_id',
        'quantity'
    ];
    
    public function shade()
    {
        return $this->belongsTo(Shade::class);
    }

    public function size()
    {
        return $this->belongsTo(Size::class);
    }
    
    public function comboProductDetails(){
        return $this->hasMany(ComboProductDetail::class, 'id', 'combo_product_detail_id');
    }
}
