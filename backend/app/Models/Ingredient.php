<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;
    protected $fillable = ['name','image', 'status'];

    public function products()
    {
        $products = Product::whereJsonContains('ingredient_id',"$this->id")->count();

         return $products;
    }
}
