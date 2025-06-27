<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Production extends Model
{
    // Ajoutez les champs que vous souhaitez rendre attribuables en masse
    protected $fillable = [
        'formule_id',
        'produit_id',
        'quantite_produite'
    ];

    public function formule()
    {
        return $this->belongsTo(Formule::class);
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'production_ingredient')
                    ->withPivot('quantite_utilisee', 'unite');
    }
}
