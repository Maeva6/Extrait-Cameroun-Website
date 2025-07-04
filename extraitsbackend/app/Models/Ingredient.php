<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ingredient extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomIngredient', 'description', 'fournisseur', 
        'stockActuel', 'prix', 'seuilAlerte', 
        'categorie', 'photo', 'etat_physique'
    ];

    public function formules()
    {
        return $this->belongsToMany(Formule::class, 'formule_ingredient')
                    ->withPivot('quantite', 'unite');
    }
    public function produits()
{
    return $this->belongsToMany(Produit::class, 'produit_ingredient', 'ingredient_id', 'produit_id');
}

}
