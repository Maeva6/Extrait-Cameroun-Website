<?php

namespace App\Http\Controllers;

use App\Models\Commandes;
use App\Models\Produit;
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

        $commandeData = [
            'montantTotal' => $request->total_price,
            'modePaiement' => $request->payment_method,
            'adresseLivraison' => "{$request->city}, {$request->neighborhood}, Tél: {$request->phone}, Nom: {$request->firstname} {$request->lastname}",
            'commentaire' => 'Commande via checkout',
            'origineCommande' => 'en_ligne',
        ];

        if (Auth::check()) {
            // Client connecté
            $commandeData['idClient'] = Auth::id();
        } else {
            // Invité
            $commandeData['nom_client'] = $request->lastname;
            $commandeData['prenom_client'] = $request->firstname;
            $commandeData['telephone_client'] = $request->phone;
        }

        $commande = Commandes::create($commandeData);

        foreach ($request->items as $item) {
            $produit = Produit::find($item['id']);

            if ($produit && $produit->quantiteProduit >= $item['quantite']) {
                $commande->produits()->attach($produit->id, [
                    'quantite' => $item['quantite']
                ]);

                $produit->decrement('quantiteProduit', $item['quantite']);
            } else {
                return response()->json([
                    'error' => "Stock insuffisant pour le produit : {$produit->nomProduit}"
                ], 400);
            }
        }

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
