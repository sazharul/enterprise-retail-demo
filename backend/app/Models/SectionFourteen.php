<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectionFourteen extends Model
{
    use HasFactory;
    protected $fillable = ['image','concern_id','status'];

    public function concerns()
    {
        return $this->belongsTo(Concern::class,'concern_id','id');
    }
}
