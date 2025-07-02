<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class AdminController extends Controller
{
    public function index()
    {
        // dd('Dashboard admin atteint ✅');
        $user = auth()->user();

        // Filtrage du rôle
        // if (!in_array($user->role, ['superadmin', 'employe'])) {
        //     return redirect('/')->with('warning', 'Accès refusé');
        // }
        if (!in_array($user->role, ['superadmin', 'employe'])) {
    return redirect()->route('dashboard')->with('warning', 'Accès refusé');
}


        return Inertia::render('Admin/Dashboard',  [
            'user' => $user
        ]);
    }
 
    public function accesUtilisateur()
{
    
    return Inertia::render('Admin/accesUtilisateurAdmin', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}

    public function client()
{

    return Inertia::render('Admin/clientAdmin', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}
    public function rapport()
{

    return Inertia::render('Admin/rapportAdmin', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}

   public function historique()
{

    return Inertia::render('Admin/historiqueAdmin', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}
   public function employes()
{

    return Inertia::render('Admin/employeAdmin', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}
   public function produits()
{

    return Inertia::render('Admin/produitAdmin', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}
   public function vente()
{

    return Inertia::render('Admin/venteAdmin', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}
   public function ingredientLab()
{

    return Inertia::render('Admin/ingredientLab', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}
   public function productions()
{

    return Inertia::render('Admin/productionAdmin', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}
 public function fournisseur()
{

    return Inertia::render('Admin/fournisseurAdmin', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}
 public function formules()
{

    return Inertia::render('Admin/formuleAdmin', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}
 public function reapprovisionnement()
{

    return Inertia::render('Admin/reapprovisionnementAdmin', [
        'user' => auth()->user(), // 👈 ici on passe l'utilisateur connecté
    ]); 
}
public function index1()
{
    $user = auth()->user();

    if (!in_array($user->role, ['superadmin', 'employe'])) {
        return redirect()->route('dashboard')->with('warning', 'Accès refusé');
    }

    $commandes = Commande::with(['client', 'produits'])
        ->orderByDesc('created_at')
        ->get()
        ->map(function ($cmd) {
            return [
                'id' => '#CMD-' . str_pad($cmd->id, 3, '0', STR_PAD_LEFT),
                'nom_client' => $cmd->client->name ?? ($cmd->prenom_client . ' ' . $cmd->nom_client) ?? 'Inconnu',
                'paiement' => $cmd->modePaiement ?? 'N/A',
                'montant' => number_format($cmd->montantTotal, 0, ',', ' ') . ' FCFA',
                'etat' => $cmd->statutCommande ?? 'En attente',
                'produits' => $cmd->produits->map(fn ($p) => [
                    'nom' => $p->nomProduit,
                    'quantite' => $p->pivot->quantite,
                    'prix' => number_format($p->prixProduit, 0, ',', ' ') . ' FCFA',
                ]),
            ];
        });

    return Inertia::render('Admin/commandesAdmin', [
        'user' => $user,
        'commandes' => $commandes
    ]);
}


public function clientStats(Request $request)
{
    // On récupère le nombre de clients par jour sur la semaine en cours
    // en filtrant les users avec le rôle 'client'

    $stats = DB::table('users')
        ->select(DB::raw('DAYNAME(created_at) as jour'), DB::raw('COUNT(*) as clients'))
        ->where('role', 'client')
        ->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()])
        ->groupBy('jour')
        ->orderByRaw('FIELD(jour, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")')
        ->get();

    // Formatage des jours en français (optionnel)
    $joursFrancais = [
        'Monday' => 'Lundi',
        'Tuesday' => 'Mardi',
        'Wednesday' => 'Mercredi',
        'Thursday' => 'Jeudi',
        'Friday' => 'Vendredi',
        'Saturday' => 'Samedi',
        'Sunday' => 'Dimanche',
    ];

    $stats = $stats->map(function ($item) use ($joursFrancais) {
        return [
            'jour' => $joursFrancais[$item->jour] ?? $item->jour,
            'clients' => $item->clients,
        ];
    });

    // Pour avoir toujours tous les jours (avec 0 si aucun client)
    $allDays = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
    $statsArray = $stats->keyBy('jour');

    $finalStats = [];
    foreach ($allDays as $day) {
        $finalStats[] = [
            'jour' => $day,
            'clients' => $statsArray->has($day) ? $statsArray[$day]['clients'] : 0,
        ];
    }

    return response()->json($finalStats);
}

}
