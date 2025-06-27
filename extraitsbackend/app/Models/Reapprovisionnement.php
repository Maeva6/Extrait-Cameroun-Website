<?php
// app/Models/Reapprovisionnement.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reapprovisionnement extends Model
{
    use HasFactory;

    protected $fillable = [
        'ingredient_id',
        'quantite_ajoutee',
        'date_reapprovisionnement',
    ];

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class);
    }
}
