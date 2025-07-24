<?php

namespace App\Http\Controllers;

use App\Models\Panier;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PanierController extends Controller
{
    // 🧺 Afficher le panier de l'utilisateur connecté
    public function index()
    {
        $paniers = Panier::with('produit')
            ->where('user_id', Auth::id())
            ->get();

        return response()->json($paniers);
    }

    // ➕ Ajouter un produit au panier
    public function ajouter(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produit,id',
            'quantite' => 'nullable|integer|min:1'
        ]);

        $panier = Panier::updateOrCreate(
            [
                'user_id' => Auth::id(),
                'produit_id' => $request->produit_id
            ],
            [
                'quantite' => $request->quantite ?? 1
            ]
        );

        return response()->json(['message' => 'Produit ajouté au panier', 'panier' => $panier]);
    }

    // ❌ Supprimer un produit du panier
    // public function supprimer($produit_id)
    // {
    //     $panier = Panier::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
    //     $panier->delete();

    //     return response()->json(['message' => 'Produit retiré du panier']);
    // }
    public function supprimer($produit_id)
{
    $deleted = Panier::where('user_id', Auth::id())
        ->where('produit_id', $produit_id)
        ->delete();

    if ($deleted) {
        return response()->json(['message' => 'Produit retiré du panier']);
    }

    return response()->json(['message' => 'Produit non trouvé'], 404);
}


    // 🧹 Vider tout le panier
    public function vider()
    {
        Panier::where('user_id', Auth::id())->delete();

        return response()->json(['message' => 'Panier vidé']);
    }
}

