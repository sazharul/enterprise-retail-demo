<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'blog_id',
        'user_id' ,
        'comment',
        'status',
    ];
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        // Set default values for attributes
        $this->attributes['user_id'] = Auth::user()?->id ?? null;
    }

    public function post()
    {
        return $this->belongsTo(Blog::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->select('name','email','avatar');
    }
}
