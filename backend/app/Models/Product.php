<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'brand_id',
        'category_id',
        'sub_category_id',
        'sub_sub_category_id',
        'size_id',
        'shade_id',
        'preference_id',
        'formulation_id',
        'finish_id',
        'country_id',
        'gender_id',
        'coverage_id',
        'benefit_id',
        'concern_id',
        'ingredient_id',
        'skin_type_id',
        'pack_id',
        'ingredient_id',
        'faq',
        'variation_type',
        'price',
        'discount_amount',
        'discount_percent',
        'discount_price',
        'product_image',
        'tax',
        'short_description',
        'ingredient_description',
        'description',
        'how_to_use',
        'is_free_delivery',
        'is_combo',
        'status',
    ];

    protected $casts = [
        'size_id' => 'array',
        'shade_id' => 'array',
        'preference_id' => 'array',
        'finish_id' => 'array',
        'gender_id' => 'array',
        'benefit_id' => 'array',
        'concern_id' => 'array',
        'ingredient_id' => 'array',
        'pack_id' => 'array',
        'ingredient_id' => 'array',
    ];

    public function reviews()
    {
        return $this->hasMany(ProductReview::class)->where('status', 2);
    }
    public function productShades()
    {
        return $this->hasMany(ProductShade::class);
    }
    public function productSizes()
    {
        return $this->hasMany(ProductSize::class);
    }
    public function sizes()
    {
        return Size::whereIn('id', json_decode($this->size_id))->get();
    }
    public function shades()
    {
        return Shade::whereIn('id', json_decode($this->shade_id))->get();
    }


    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function subCategory()
    {
        return $this->belongsTo(Category::class, 'sub_category_id');
    }
    public function subSubCategory()
    {
        return $this->belongsTo(Category::class, 'sub_sub_category_id');
    }
    public function brand()
    {
        return $this->belongsTo(Brand::class)->where('status', 1);
    }
    public function formulation()
    {
        return $this->belongsTo(Formulation::class)->where('status', 1);
    }
    public function country()
    {
        return $this->belongsTo(Country::class)->where('status', 1);
    }
    public function coverage()
    {
        return $this->belongsTo(Coverage::class)->where('status', 1);
    }
    public function skin_type()
    {
        return $this->belongsTo(SkinType::class)->where('status', 1);
    }
    public function size()
    {
        return $this->belongsTo(Size::class);
    }
    public function benefit()
    {
        return $this->belongsTo(Benefit::class, 'benefit_id');
    }
    public function wishlists()
    {
        return $this->belongsToMany(Wishlist::class);
    }
    public function getShadeCountAttribute()
    {
        return $this->productShadeImages()->count();
    }

    public function getSizeNamesAttribute()
    {
        return $this->sizes->pluck('name')->toArray();
    }

    public function offer()
    {
        return $this->hasMany(Offer::class);
    }

    public function order_details()
    {
        return $this->hasMany(OrderDetail::class);
    }

}
