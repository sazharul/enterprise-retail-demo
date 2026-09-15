<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RewardSetup extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'reward_point',
        'reward_point_value'
    ];
    
}
