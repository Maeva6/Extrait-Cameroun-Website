<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'slug',
        'description',
        'prix',
        'image',
        'categorie_id',
        'disponible',
    ];

    protected $casts = [
        'disponible' => 'boolean',
        'prix' => 'decimal:2',
    ];

    // 🔗 Relation avec la catégorie
    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    // 🧠 Slug automatique (si tu veux l’ajouter plus tard)
    // protected static function booted()
    // {
    //     static::creating(function ($service) {
    //         $service->slug = \Str::slug($service->nom);
    //     });
    // }
    public function commandes()
{
    return $this->belongsToMany(Commande::class, 'commande_service')
        ->withPivot('quantite')
        ->withTimestamps();
}

}
