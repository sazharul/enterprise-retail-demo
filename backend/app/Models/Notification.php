<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notification extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'title',
        'description',
    ];

    protected $dates = ['deleted_at'];

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
