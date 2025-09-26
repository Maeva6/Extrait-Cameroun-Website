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
        $paniers = Panier::with('produit', 'accessoire', 'service')
            ->where('user_id', Auth::id())
            ->get();
    //     $paniers = Panier::with(['produit', 'accessoires'])
    // ->where('user_id', Auth::id())
    // ->get();


        return response()->json($paniers);
    }



// public function ajouter(Request $request)
// {
//     $request->validate([
//         'produit_id' => 'nullable|exists:produits,id',
//         'accessoire_id' => 'nullable|exists:accessoires,id',
//         'quantite' => 'nullable|integer|min:1'
//     ]);

//     if (!$request->produit_id && !$request->accessoire_id) {
//         return response()->json(['message' => 'Aucun produit ou accessoire spécifié'], 422);
//     }

//     $panierData = [
//         'user_id' => Auth::id(),
//         'quantite' => $request->quantite ?? 1,
//         'produit_id' => $request->produit_id,
//         'accessoire_id' => $request->accessoire_id
//     ];

//     $panier = Panier::create($panierData);

//     $message = $request->produit_id ? 'Produit ajouté au panier' : 'Accessoire ajouté au panier';

//     return response()->json(['message' => $message, 'panier' => $panier]);
// }

public function ajouter(Request $request)
{
    $request->validate([
        'produit_id' => 'nullable|exists:produit,id',
        'accessoire_id' => 'nullable|exists:accessoires,id',
        'service_id' => 'nullable|exists:services,id',
        'quantite' => 'nullable|integer|min:1'
    ]);

    if (!$request->produit_id && !$request->accessoire_id && !$request->service_id) {
        return response()->json(['message' => 'Aucun article spécifié'], 422);
    }

    $userId = Auth::id();
    $quantite = $request->quantite ?? 1;

    $conditions = [
        'user_id' => $userId,
        'produit_id' => null,
        'accessoire_id' => null,
        'service_id' => null
    ];

    $data = [
        'user_id' => $userId,
        'quantite' => $quantite
    ];

    if ($request->produit_id) {
        $conditions['produit_id'] = $request->produit_id;
        $data['produit_id'] = $request->produit_id;
        $message = 'Produit ajouté au panier';
    } elseif ($request->accessoire_id) {
        $conditions['accessoire_id'] = $request->accessoire_id;
        $data['accessoire_id'] = $request->accessoire_id;
        $message = 'Accessoire ajouté au panier';
    } else {
        $conditions['service_id'] = $request->service_id;
        $data['service_id'] = $request->service_id;
        $message = 'Service ajouté au panier';
    }

    $panier = Panier::updateOrCreate($conditions, $data);

    return response()->json(['message' => $message, 'panier' => $panier]);
}




    // ❌ Supprimer un produit du panier
    // public function supprimer($produit_id)
    // {
    //     $panier = Panier::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
    //     $panier->delete();

    //     return response()->json(['message' => 'Produit retiré du panier']);
    // }
//     public function supprimer($produit_id)
// {
//     $deleted = Panier::where('user_id', Auth::id())
//         ->where('produit_id', $produit_id)
//         ->delete();

//     if ($deleted) {
//         return response()->json(['message' => 'Produit retiré du panier']);
//     }

//     return response()->json(['message' => 'Produit non trouvé'], 404);
// }
public function supprimer($id)
{
    $deleted = Panier::where('user_id', Auth::id())
        ->where(function ($query) use ($id) {
            $query->where('produit_id', $id)
                  ->orWhere('accessoire_id', $id)
                  ->orWhere('service_id', $id);
        })
        ->delete();

    if ($deleted) {
        return response()->json(['message' => 'Article retiré du panier']);
    }

    return response()->json(['message' => 'Article non trouvé'], 404);
}



    // 🧹 Vider tout le panier
    public function vider()
    {
        Panier::where('user_id', Auth::id())->delete();

        return response()->json(['message' => 'Panier vidé']);
    }
}

