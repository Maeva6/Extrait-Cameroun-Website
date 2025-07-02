<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandeProduit extends Model
{
    use HasFactory;

    protected $table = 'commande_produit'; // Nom de la table dans la base de données

    protected $fillable = [
        'commande_id',
        'produit_id',
        'quantite',
    ];

    // Si vous avez des relations, vous pouvez les définir ici
    public function commande()
    {
        return $this->belongsTo(Commande::class, 'idCommande');
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }
}
