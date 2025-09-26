<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
  use App\Models\Favorite;
  use App\Models\Accessoires;
  use App\Models\Service;
  use App\Models\Produit;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class FavoriteController extends Controller
{


public function index()
{
    $favorites = Favorite::with(['produit', 'accessoire', 'service'])
    ->where('user_id', Auth::id())
    ->get();

        // ->pluck('produit'); // on récupère directement les produits

    return Inertia::render('FavoritesPage', [
        'favorites' => $favorites,
    ]);
}
// public function store(Request $request)
// {
//     $request->validate([
//         'produit_id' => 'required|exists:produit,id',
//     ]);

//     Favorite::firstOrCreate([
//         'user_id' => Auth::id(),
//         'produit_id' => $request->produit_id,
//     ]);

//     return back()->with('success', 'Produit ajouté aux favoris');
// }

public function store(Request $request)
{
    $request->validate([
        'produit_id' => 'nullable|exists:produit,id',
        'accessoire_id' => 'nullable|exists:accessoires,id',
        'service_id' => 'nullable|exists:services,id',
    ]);

    if (!$request->produit_id && !$request->accessoire_id && !$request->service_id) {
        return back()->with('error', 'Aucun article spécifié');
    }

    $data = [
        'user_id' => Auth::id(),
        'produit_id' => $request->produit_id,
        'accessoire_id' => $request->accessoire_id,
        'service_id' => $request->service_id,
    ];

    Favorite::firstOrCreate($data);

    return back()->with('success', 'Article ajouté aux favoris');
}

public function dashboard()
{
    $favorites = Favorite::with('produit','accessoire','service')
        ->where('user_id', auth()->id())
        ->latest()
        ->take(3)
        ->get();
        // ->pluck('produit');

    $commandes = Commande::with('produits')
        ->where('idClient', auth()->id())
        ->latest()
        ->take(3)
        ->get();

    return Inertia::render('UserDashboard', [
        'auth' => ['user' => Auth::user()],
        'favorites' => $favorites,
        'orders' => $commandes,
    ]);
}
// public function destroy($id, Request $request)
// {
//     $type = $request->query('type');

//     $query = Favorite::where('user_id', Auth::id());

//     if ($type === 'produit') {
//         $query->where('produit_id', $id);
//     } elseif ($type === 'accessoire') {
//         $query->where('accessoire_id', $id);
//     } elseif ($type === 'service') {
//         $query->where('service_id', $id);
//     } else {
//         return response('', 422);
//     }

//     $deleted = $query->delete();

//     return response()->json(['success'=> true]); // aucun contenu, aucune redirection

// }

public function destroy($id, Request $request)
{
    $type = $request->query('type');

    $query = Favorite::where('user_id', Auth::id());

    if ($type === 'produit') {
        $query->where('produit_id', $id);
    } elseif ($type === 'accessoire') {
        $query->where('accessoire_id', $id);
    } elseif ($type === 'service') {
        $query->where('service_id', $id);
    } else {
        return response()->json(['error' => 'Type invalide'], 422);
    }

    $query->delete();

    return response()->json(['success' => true], 200); // ✅ réponse JSON pour Axios
}


}
