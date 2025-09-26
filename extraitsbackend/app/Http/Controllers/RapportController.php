<?php
namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\CommandeProduit;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RapportController extends Controller
{
    public function getRapportData()
    {
        // 1. Chiffre d'affaires (uniquement payées) - CORRECT
        $chiffreAffaires = Commande::where('statutCommande', 'payée')
            ->sum('montantTotal');

        // 2. Nombre de commandes (uniquement payées) - CORRECT
        $nombreCommandes = Commande::where('statutCommande', 'payée')
            ->count();

        // 3. Panier moyen (uniquement payées) - CORRECT
        $panierMoyen = Commande::where('statutCommande', 'payée')
            ->avg('montantTotal');

        // 4. Nombre de produits vendus (uniquement payées) - CORRECT
        $nombreProduitsVendus = CommandeProduit::join('commandes', 'commande_produit.commande_id', '=', 'commandes.idCommande')
            ->where('commandes.statutCommande', 'payée')
            ->sum('commande_produit.quantite');

        return response()->json([
            'chiffreAffaires' => $chiffreAffaires,
            'nombreCommandes' => $nombreCommandes,
            'panierMoyen' => $panierMoyen,
            'nombreProduitsVendus' => $nombreProduitsVendus,
        ]);
    }

         public function getTopProduitsVendus()
    {
        // Récupérer le total de tous les produits vendus
        $totalProduitsVendus = CommandeProduit::join('commandes', 'commande_produit.commande_id', '=', 'commandes.idCommande')
            ->where('commandes.statutCommande', 'payée')
            ->sum('commande_produit.quantite');

        $topProduits = CommandeProduit::join('commandes', 'commande_produit.commande_id', '=', 'commandes.idCommande')
            ->where('commandes.statutCommande', 'payée')
            ->select('produit_id', DB::raw('SUM(quantite) as total_quantite'))
            ->groupBy('produit_id')
            ->orderBy('total_quantite', 'desc')
            ->take(5)
            ->get();

        $produits = [];
        foreach ($topProduits as $produit) {
            $produitDetails = Produit::find($produit->produit_id);
            $pourcentage = $totalProduitsVendus > 0 
                ? ($produit->total_quantite / $totalProduitsVendus) * 100 
                : 0;
                
            $produits[] = [
                'nom' => $produitDetails->nomProduit,
                'quantite' => $produit->total_quantite,
                'pourcentage' => round($pourcentage, 2) // Ajouter le pourcentage
            ];
        }

        return response()->json($produits);
    }

        public function getVentesParCategorieSenteur()
    {
        // Récupérer le total de tous les produits vendus
        $totalProduitsVendus = CommandeProduit::join('commandes', 'commande_produit.commande_id', '=', 'commandes.idCommande')
            ->where('commandes.statutCommande', 'payée')
            ->sum('commande_produit.quantite');

        $ventesParCategorie = CommandeProduit::join('produit', 'commande_produit.produit_id', '=', 'produit.id')
            ->join('commandes', 'commande_produit.commande_id', '=', 'commandes.idCommande')
            ->where('commandes.statutCommande', 'payée')
            ->select('produit.senteur', DB::raw('SUM(commande_produit.quantite) as total_quantite'))
            ->groupBy('produit.senteur')
            ->get();

        // Ajouter le pourcentage pour chaque catégorie
        $ventesParCategorie->transform(function ($item) use ($totalProduitsVendus) {
            $item->pourcentage = $totalProduitsVendus > 0 
                ? round(($item->total_quantite / $totalProduitsVendus) * 100, 2)
                : 0;
            return $item;
        });

        return response()->json($ventesParCategorie);
    }

public function getDetailsVentes()
    {
        $detailsVentes = CommandeProduit::join('produit', 'commande_produit.produit_id', '=', 'produit.id')
            ->join('commandes', 'commande_produit.commande_id', '=', 'commandes.idCommande')
            ->where('commandes.statutCommande', 'payée') // Filtre ajouté ici
            ->select(
                'produit.nomProduit as produit',
                'commande_produit.quantite',
                DB::raw('commandes.montantTotal as CA'),
                'commandes.dateCommande',
                'commandes.idCommande as commandeId', // Ajouté pour le filtrage frontend
                DB::raw('(commande_produit.quantite * commandes.montantTotal) / 
                        (SELECT SUM(quantite * commandes.montantTotal) 
                         FROM commande_produit 
                         JOIN commandes ON commande_produit.commande_id = commandes.idCommande
                         WHERE commandes.statutCommande = "payée") * 100 as partDeMarche')
            )
            ->get();
    
        return response()->json($detailsVentes);
    }

}
