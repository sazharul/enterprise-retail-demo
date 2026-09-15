<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable as HasSlug;

class Blog extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = ['title', 'image', 'description','status'];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->where('status',1);
    }
}
