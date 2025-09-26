<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    protected $fillable = [
        'user_id',
        'produit_id',
        'accessoire_id',
        'service_id',
        // autres champs si besoin
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class);
    }
    public function accessoire()
    {
        return $this->belongsTo(Accessoires::class);
    }
    public function service()
    {
        return $this->belongsTo(\App\Models\Service::class);
    }
}
