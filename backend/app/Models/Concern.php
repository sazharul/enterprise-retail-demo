<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Concern extends Model
{
    use HasFactory;
    protected $fillable = ['name','image', 'status'];
    public function products()
    {
        $products = Product::whereJsonContains('concern_id',"$this->id")->count();

         return $products;
    }
}
