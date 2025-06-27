<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Formule extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nom_formule',
        'description',
        'produit_id',
        'instructions',
        'createur'
    ];

    protected $with = ['produit']; // Charge automatiquement la relation

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'formule_ingredient')
                    ->withPivot('quantite', 'unite')
                    ->withTimestamps();
    }
}