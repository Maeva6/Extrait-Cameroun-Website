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
        // 1. Chiffre d'affaires
        $chiffreAffaires = Commande::where('statutCommande', 'payée')
            ->sum('montantTotal');

        // 2. Nombre de commandes
        $nombreCommandes = Commande::count();

        // 3. Panier moyen
        $panierMoyen = Commande::avg('montantTotal');

        // 4. Nombre de produits vendus
        $nombreProduitsVendus = CommandeProduit::sum('quantite');
  // Faire la somme des quantités dans la table commande_produit
  
        return response()->json([
            'chiffreAffaires' => $chiffreAffaires,
            'nombreCommandes' => $nombreCommandes,
            'panierMoyen' => $panierMoyen,
            'nombreProduitsVendus' => $nombreProduitsVendus,
        ]);
    }

    public function getTopProduitsVendus()
    {
        $topProduits = CommandeProduit::select('produit_id', DB::raw('SUM(quantite) as total_quantite'))
            ->groupBy('produit_id')
            ->orderBy('total_quantite', 'desc')
            ->take(5) // Prendre les 5 produits les plus vendus
            ->get();

        $produits = [];
        foreach ($topProduits as $produit) {
            $produitDetails = Produit::find($produit->produit_id);
            $produits[] = [
                'nom' => $produitDetails->nomProduit,
                'quantite' => $produit->total_quantite
            ];
        }

        return response()->json($produits);
    }

    public function getVentesParCategorieSenteur()
    {
        $ventesParCategorie = CommandeProduit::join('produit', 'commande_produit.produit_id', '=', 'produit.id')
            ->select('produit.senteur', DB::raw('SUM(commande_produit.quantite) as total_quantite'))
            ->groupBy('produit.senteur')
            ->get();

        return response()->json($ventesParCategorie);
    }

    public function getDetailsVentes()
    {
        $detailsVentes = CommandeProduit::join('produit', 'commande_produit.produit_id', '=', 'produit.id')
            ->join('commandes', 'commande_produit.commande_id', '=', 'commandes.idCommande')
            ->select(
                'produit.nomProduit as produit',
                'commande_produit.quantite',
                DB::raw('commandes.montantTotal as CA'),
                'commandes.dateCommande',
                DB::raw('(commande_produit.quantite * commandes.montantTotal) / (SELECT SUM(quantite * commandes.montantTotal) FROM commande_produit JOIN commandes ON commande_produit.commande_id = commandes.idCommande) * 100 as partDeMarche')
            )
            ->get();

        return response()->json($detailsVentes);
    }

}
