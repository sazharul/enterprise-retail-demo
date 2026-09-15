<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectionThree extends Model
{
    use HasFactory;
    protected $fillable = ['name','image','description', 'offer_id','status'];

    public function offers()
    {
        return $this->belongsTo(Offer::class,'offer_id','id');
    }
}
