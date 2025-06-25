<?php

namespace App\Http\Controllers;

use App\Models\Commandes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommandeController extends Controller
{
   public function store(Request $request)
{
    $request->validate([
        'items' => 'required|array',
        'total_price' => 'required|numeric',
        'payment_method' => 'required|string',
        'lastname' => 'required|string',
        'firstname' => 'required|string',
        'city' => 'required|string',
        'neighborhood' => 'required|string',
        'phone' => 'required|string',
    ]);

    Commandes::create([
        'idClient' => Auth::id(),
        'montantTotal' => $request->total_price,
        'modePaiement' => $request->payment_method,
        'adresseLivraison' => "{$request->city}, {$request->neighborhood}, Tél: {$request->phone}, Nom: {$request->firstname} {$request->lastname}",
        'commentaire' => 'Commande via checkout',
        'origineCommande' => 'en_ligne',
    ]);

    return response()->json(['message' => 'Commande enregistrée']);
}
public function index()
{
    $commandes = Commandes::where('idClient', auth()->id())
        ->orderByDesc('dateCommande')
        ->get();

    return Inertia::render('User/OrdersPage', [
        'commandes' => $commandes,
    ]);
}
}
