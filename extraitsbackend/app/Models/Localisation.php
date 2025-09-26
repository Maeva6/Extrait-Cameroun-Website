<?php
// app/Models/Localisation.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Localisation extends Model
{
    use HasFactory;

    protected $table = 'localisations';

    protected $fillable = ['nom', 'description'];

    public function produits()
    {
        return $this->belongsToMany(Produit::class, 'localisation_produit')
                    ->withPivot('quantite')
                    ->withTimestamps();
    }
}
