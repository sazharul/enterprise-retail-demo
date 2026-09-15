<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Preference extends Model
{
    use HasFactory;
    protected $fillable = ['name','image', 'status'];

    public function product()
    {
        $products = Product::whereJsonContains('preference_id',"$this->id")->count();

         return $products;
    }
    public function products()
    {
        return $this->belongsToMany(Product::class, 'preference_id')->withTimestamps();
    }
}
