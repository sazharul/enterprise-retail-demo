<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductViewHistory extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'product_id',
        'category_id',
        'view_count',
    ];
}
