<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RewardHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_id',
        'withdraw_id',
        'using_point',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function users()
    {
        return $this->belongsTo(User::class);
    }
    // public function reward()
    // {
    //     return $this->hasOne(Reward::class);
    // }
}
