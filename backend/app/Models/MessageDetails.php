<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MessageDetails extends Model
{
    use HasFactory;
    protected $table = 'message_details';
    protected $fillable = [
        'message_id',
        'sender_id',
        'receiver_id',
        'message',
        'image',
    ];

    public function message()
    {
        return $this->belongsTo(Message::class, 'message_id');
    }
}
