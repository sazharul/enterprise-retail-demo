<?php

namespace App\Models;

use App\Models\Brand;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SectionThirteen extends Model
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

