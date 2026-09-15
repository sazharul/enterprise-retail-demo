<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shade extends Model
{
    use HasFactory;
    protected $fillable = ['name','image','status','color_id'];

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function products()
    {
        return $this->hasMany(ProductShadeImage::class);
    }
}
