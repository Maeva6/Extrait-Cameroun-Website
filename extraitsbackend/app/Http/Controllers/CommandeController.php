<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\Favorite;
use App\Models\Produit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class CommandeController extends Controller
{
    public function store(Request $request)

    
    { \Log::info('STORE COMMANDE called', $request->all());
    // dd('commande reçue', $request->all());
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

        // if (Auth::check()) {
        //     // Client connecté
        //     $commandeData['idClient'] = Auth::id();
        // } else {
        //     // Invité
        //     $commandeData['nom_client'] = $request->lastname;
        //     $commandeData['prenom_client'] = $request->firstname;
        //     $commandeData['telephone_client'] = $request->phone;
        // }
        if ($request->has('client_id')) {
    // Création par l’admin pour un client spécifique
    $commandeData['idClient'] = $request->client_id;
} elseif (Auth::check()) {
    // Commande classique par un utilisateur connecté
    $commandeData['idClient'] = Auth::id();
} else {
    // Commande invitée
    $commandeData['nom_client'] = $request->lastname;
    $commandeData['prenom_client'] = $request->firstname;
    $commandeData['telephone_client'] = $request->phone;
}

        $commande = Commande::create($commandeData);

        foreach ($request->items as $item) {
            $produit = Produit::find($item['id']);

            if ($produit && $produit->quantiteProduit >= $item['quantity']) {
                $commande->produits()->attach($produit->id, [
                    'quantite' => $item['quantity']
                ]);

                $produit->decrement('quantiteProduit', $item['quantity']);
            } else {
                return response()->json([
                    'error' => "Stock insuffisant pour le produit : {$produit->nomProduit}"
                ], 400);
            }
        }
         \Log::info('✅ Commande enregistrée avec ID ' . $commande->id);

        // return response()->json(['message' => 'Commande enregistrée','commande_id' => $commande->id]);
        return redirect()->back()->with('success', 'Commande enregistrée');

            // return redirect()->route('orders.index')->with('success', 'Commande enregistrée avec succès');
        // return redirect()->route('commande.create')->with('success', 'Commande enregistrée avec succès ✅');

    }
//     public function store(Request $request)
// {
//     \Log::info('STORE COMMANDE called', $request->all());

//     try {
//         $validated = $request->validate([
//             'items' => 'required|array|min:1',
//             'total_price' => 'required|numeric|min:0',
//             'payment_method' => 'required|string',
//             'lastname' => 'required|string',
//             'firstname' => 'required|string',
//             'city' => 'nullable|string',
//             'neighborhood' => 'nullable|string',
//             'phone' => 'nullable|string',
//         ]);
        
//         // Exemple d'insertion (adapter selon ta table)
//         $commande = Commande::create([
//             'total_price' => $validated['total_price'],
//             'payment_method' => $validated['payment_method'],
//             'lastname' => $validated['lastname'],
//             'firstname' => $validated['firstname'],
//             'city' => $validated['city'] ?? null,
//             'neighborhood' => $validated['neighborhood'] ?? null,
//             'phone' => $validated['phone'] ?? null,
//             // ... autres champs
//         ]);
        
//         // Sauvegarder les items associés (adapter selon ta logique)
//         foreach ($validated['items'] as $item) {
//             $commande->items()->create([
//                 'produit_id' => $item['id'],
//                 'quantite' => $item['quantite'],
//             ]);
//         }
        
//         return response()->json(['message' => 'Commande créée avec succès']);
        
//     } catch (\Exception $e) {
//         \Log::error('Erreur store commande: ' . $e->getMessage());
//         return response()->json(['error' => 'Erreur serveur lors de la création de la commande'], 500);
//     }
// }


    // public function index()
    // {
    //     $commandes = Commande::where('idClient', auth()->id())
    //         ->orderByDesc('dateCommande')
    //         ->get();

    //     return Inertia::render('User/OrdersPage', [
    //         'commandes' => $commandes,
    //     ]);
    // }
    public function index()
{
    $commandes = Commande::with(['produits' => function ($query) {
        $query->select('produit.id', 'nomProduit', 'imagePrincipale');
    }])
    ->where('idClient', auth()->id())
    ->orderByDesc('dateCommande')
    ->get();

    return Inertia::render('User/OrdersPage', [
        'commandes' => $commandes,
    ]);
}


    /*formulaire pour les commandes*/
    public function create()
{
    $clients = \App\Models\User::where('role', 'client')->get();
    $produits = \App\Models\Produit::where('estDisponible', true)->get();

    return Inertia::render('formulaire/formulaireCommande', [
        'clients' => $clients,
        'produits' => $produits
    ]);
}
public function ventesHebdomadaires(Request $request)
    {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
    
        $ventes = Commande::where('statutCommande', 'payée')
            ->whereBetween('dateCommande', [$startDate, $endDate])
            ->selectRaw('DAYOFWEEK(dateCommande) as day, SUM(montantTotal) as total')
            ->groupBy('day')
            ->orderBy('day')
            ->get();
    
        $weeklyTotals = [0, 0, 0, 0, 0, 0, 0];
    
        // foreach ($ventes as $vente) {
        //     $dayIndex = $vente->day - 1;
        //     $weeklyTotals[$dayIndex] = $vente->total;
        // }
         foreach ($ventes as $vente) {
    // Recalibrage : on veut que lundi = 0, mardi = 1, ..., dimanche = 6
    $dayIndex = $vente->day == 1 ? 6 : $vente->day - 2;
    $weeklyTotals[$dayIndex] = $vente->total;
}

        return response()->json($weeklyTotals);
    }  
    
    
    public function getVentes()
{
    $ventes = Commande::with('produits')->get();

    $ventesData = $ventes->map(function ($vente) {
        return [
            'id' => $vente->idCommande,
            'client' => $vente->client->name,
            'produits' => $vente->produits->pluck('nomProduit')->join(', '),
            'prix' => $vente->montantTotal,
            'dateCommande' => $vente->dateCommande
        ];
    });

    return response()->json($ventesData);
}

public function destroy($id)
    {
        $vente = Commande::findOrFail($id);
        $vente->delete();

        return response()->json(['message' => 'Vente supprimée avec succès']);
    }

    public function dashboard()
{
 $commandes = Commande::with(['produits', 'services', 'accessoires'])
    ->where('idClient', auth()->id())
    ->latest()
    ->take(3)
    ->get();

    //  ->pluck('produit');
     $favorites = Favorite::with('produit','accessoire','service')
        ->where('user_id', auth()->id())
        ->latest()
        ->take(3)
        ->get();
        $latestProduits = Produit::latest()->take(3)->get(); // ✅ ici

    return Inertia::render('User/UserDashboard', [
        'auth' => ['user' => Auth::user()],
        'orders' => $commandes,
        'favorites' => $favorites,
        'latestProduits' => $latestProduits,
    ]);
}

 public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'statutCommande' => 'required|in:en_attente,payée,expédiée,livrée,annulée'
        ]);
    
        // Utilisez find() avec idCommande au lieu de l'approche par modèle
        $commande = Commande::where('idCommande', $id)->firstOrFail();
        $commande->statutCommande = $request->statutCommande;
        $commande->save();
    
        return response()->json(['message' => 'Statut mis à jour avec succès']);
    }
}
