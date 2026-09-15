<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use HasFactory;
    use SoftDeletes;

    public $fillable = [
        'admin_id',
        'user_id',
        'is_admin_read',
        'is_user_read',
    ];

    public function message_details()
    {
        return $this->hasMany(MessageDetails::class, 'message_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->select( 'id','name', 'avatar');
    }
}
