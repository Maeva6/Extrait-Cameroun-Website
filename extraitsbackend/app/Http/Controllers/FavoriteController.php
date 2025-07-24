<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
  use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class FavoriteController extends Controller
{


public function index()
{
    $favorites = Favorite::with('produit')
        ->where('user_id', Auth::id())
        ->get()
        ->pluck('produit'); // on récupère directement les produits

    return Inertia::render('FavoritesPage', [
        'favorites' => $favorites,
    ]);
}
public function store(Request $request)
{
    $request->validate([
        'produit_id' => 'required|exists:produit,id',
    ]);

    Favorite::firstOrCreate([
        'user_id' => Auth::id(),
        'produit_id' => $request->produit_id,
    ]);

    return back()->with('success', 'Produit ajouté aux favoris');
}

public function dashboard()
{
    $favorites = Favorite::with('produit')
        ->where('user_id', auth()->id())
        ->latest()
        ->take(3)
        ->get()
        ->pluck('produit');

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

}
