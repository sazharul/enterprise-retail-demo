<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SectionTwelve extends Model
{
    use HasFactory;
    protected $fillable = ['image','category_id','status'];

    public function categories()
    {
        return $this->belongsTo(Category::class,'category_id','id');
    }
}
