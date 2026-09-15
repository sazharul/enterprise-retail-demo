<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gender extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'status'];
    public function products()
    {
        $products = Product::whereJsonContains('gender_id',"$this->id")->count();

         return $products;
    }
}
