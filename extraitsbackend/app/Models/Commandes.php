<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Commandes extends Model
{
    use HasFactory;

    protected $table = 'commandes'; // ← optionnel si le nom correspond

    protected $primaryKey = 'idCommande';

    protected $fillable = [
        'idClient',
        'dateCommande',
        'statutCommande',
        'modePaiement',
        'montantTotal',
        'adresseLivraison',
        'commentaire',
        'origineCommande',
        'idEmploye',
    ];

    public $timestamps = true;

    // Relation vers le client
    public function client()
    {
        return $this->belongsTo(User::class, 'idClient');
    }

    // Relation vers l'employé (optionnel)
    public function employe()
    {
        return $this->belongsTo(User::class, 'idEmploye');
    }
}
