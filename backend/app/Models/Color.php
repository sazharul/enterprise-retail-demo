<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    use HasFactory;
    protected $fillable = ['name','image','status'];

    public function shades()
    {
        return $this->hasMany(Shade::class);
    }

    public function products()
    {
        $products = Product::whereJsonContains('main_color_id',"$this->id")->count();

         return $products;
    }
}
