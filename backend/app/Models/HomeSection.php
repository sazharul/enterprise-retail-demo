<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class HomeSection extends Model
{
    use HasFactory;
    protected $fillable = ['title','mobile_title','banner','position','type','status'];

}
