<?php

namespace App\Models;

use App\Models\Brand;
use App\Models\Offer;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OfferUpToSale extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'product_id',
        'category_id',
        'brand_id',
        'offer_id', // Add this line
        'product_shade_id',
        'product_size_id',
        'current_price',
        'discounted_price',
        'flat_discount',
        'percent_discount',
        'status',
    ];

    // Define the relationship with the Product model
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Define the relationship with the Category model (if applicable)
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Define the relationship with the Brand model (if applicable)
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    // Define the relationship with the Offer model (if applicable)
    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }


    public function size()
    {
        return $this->belongsTo(Size::class);
    }
    public function shade()
    {
        return $this->belongsTo(Shade::class);
    }

    public function productShades()
    {

        return $this->hasOne(ProductShade::class, 'id','product_shade_id');
    }
    public function productSizes()
    {
        return $this->hasOne(ProductSize::class,'id','product_size_id');
    }
}
