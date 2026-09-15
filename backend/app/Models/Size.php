<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    use HasFactory;
    protected $fillable = ['name','status'];

    public function products()
    {
        $products = Product::whereJsonContains('size_id',"$this->id")->count();
        return $products;
    }

    public function product()
    {
        return $this->hasMany(ProductSizeImage::class);
    }


}
