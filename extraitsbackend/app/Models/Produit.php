<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Produit extends Model
{
   use HasFactory;

    //protected $primaryKey = 'idProduit';
    protected $table = 'produit';
    protected $fillable = [
        'nomProduit',
        'categorie',
        'sexeCible',
        'familleOlfactive',
        'quantiteProduit',
        'quantiteAlerte',
        'estDisponible',
        'descriptionProduit',
        'contenanceProduit',
        'prixProduit',
        'imagePrincipale',
        'personnalite',
        'senteur',
        'modeUtilisation',
        'particularite',
    ];

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class, 'produit_ingredient', 'produit_id', 'ingredient_id');
    }
     public function categorie()
{
    return $this->belongsTo(Categorie::class, 'categorie_id');
}
}
