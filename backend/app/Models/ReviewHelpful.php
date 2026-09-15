<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReviewHelpful extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_review_id',
        'user_id',
        'helpful',
    ];
}
