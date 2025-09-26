<?php
// app/Models/LocalisationProduit.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocalisationProduit extends Model
{
    use HasFactory;

    protected $table = 'localisation_produit';

    protected $fillable = ['produit_id', 'localisation_id', 'quantite'];

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }

    public function localisation()
    {
        return $this->belongsTo(Localisation::class, 'localisation_id');
    }
}
