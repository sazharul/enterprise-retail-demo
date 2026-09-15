<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectionSixteen extends Model
{
    use HasFactory;
    protected $fillable = ['product_id','combo_product_id','status'];

    public function product() {
        return $this->belongsTo(Product::class,'product_id');
    }

    public function combo() {
        return $this->belongsTo(Offer::class,'combo_product_id');
    }
}
