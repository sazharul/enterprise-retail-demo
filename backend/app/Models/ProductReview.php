<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'product_id',
        'order_id',
        'title',
        'shade_id',
        'size_id',
        'comment',
        'star',
        'status',
    ];
    protected $casts = [
        'images' => 'array',
    ];


    public function product()
    {
        return $this->belongsTo(Product::class)->select('name','image','price','discount_price','brand_id','category_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function shade()
    {
        return $this->belongsTo(Shade::class);
    }
    public function size()
    {
        return $this->belongsTo(Size::class);
    }
    public function reviewHelpful()
    {
        return $this->hasMany(ReviewHelpful::class);
    }

    public function productReviewImages(){
        return $this->hasMany(ProductReviewImage::class);
    }
}
