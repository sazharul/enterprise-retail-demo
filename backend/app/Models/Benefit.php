<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Benefit extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'image', 'status'];

    public function products()
    {
        $products = Product::whereJsonContains('benefit_id',"$this->id")->count();

         return $products;
    }


    // public function products($id)
    // {
    //     return $this->hasMany(Product::class)->where(function ($query) use ($id) {
    //         $query->WhereJsonContains('benefit_id', 1);
    //     });
    // }

    // public function products()
    // {
    //     dd( $this->hasMany(Product::class)->Where('benefit_id', '["1","2"]'));

    // }

    // public function products()
    // {
    //     dd( Product::whereIn(json_decode('benefit_id'),1)->get());

    // }

    // public function products()
    // {
    //     $products = Product::whereJsonContains('benefit_id',$this->id)->get();
    //     //dd($products);
    // }

    // public function products()
    // {

    //     //  $products = Product::whereJsonContains('benefit_id',$this->id)->get();
    //     //  return $products;
    //     //  //dd($products);
    //    return $this->hasMany(Product::class)->whereJsonContains('benefit_id',$this->id);
    // }

}
